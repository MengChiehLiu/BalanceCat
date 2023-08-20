const {SqlClient} = require('../utils/ORM');
const {register} = require('../models/registers')
const {updateBalances} = require('../models/balances')
const {CustomError} = require('../utils/others');


// helper function
async function insertEntryDetails(client, entry_id, details){

    try{
        const query = `INSERT INTO entryDetails (entry_id, subject_id, amount, description) VALUES ?;`
        let aValue = [];
        for (let detail of details) aValue.push([entry_id, detail.subject_id, detail.amount, detail.description]);

        await client.query(query, [aValue])
        return;

    }catch(err){
        console.log('insertEntryDetails fail')
        throw err
    }
}

// router functions
async function getAnEntry(user_id, entry_id){
    client = new SqlClient();
    await client.connect();

    const toSelect = `
        e.id, DATE_FORMAT(e.timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                "subject", JSON_OBJECT(
                    "id", s.id,
                    "name", s.name,
                    "is_debit", s.is_debit
                ),
                "amount", ed.amount,
                "description", ed.description
            )
        ) AS details
            `

    try{
        const [entry] = await client
            .select('entries', 'id, timestamp')
            .where({'user_id=?': user_id, 'id=?': entry_id})
            .as('e')

            .select('e', toSelect)
            .join('entryDetails as ed', 'e.id=ed.entry_id')
            .join('subjects as s', 's.id=ed.subject_id')
            .group('id')
            .query()

        if (entry[0].length === 0) throw new CustomError("Invalid access.")
        return entry[0];

    }catch(err){
        throw err;

    }finally{
        client.close();
    }
}

async function postAnEntry(user_id, details, timestamp, parent_id){
    client = new SqlClient();
    await client.connect();

    try{
        await client.transaction();

        // insert entry
        const [result] = await client
            .insert('entries', {'user_id': user_id, 'timestamp': timestamp, 'parent_id': parent_id})
            .query()

        const entry_id = result.insertId;
        const month = `${timestamp.slice(0, 7)}-01`

        // insert entry details & update balance & register
        await Promise.all([
            insertEntryDetails(client, entry_id, details),
            updateBalances(client, user_id, month, details),
            register(client, user_id, entry_id, timestamp, details)
        ]);

        await client.commit();
        return entry_id;
        
    }catch(err){
        await client.rollback();
        throw err;

    }finally{
        client.close();
    };
}

async function deletingAnEntryWithId(client, entry_id){
    try{
        const query = `DELETE FROM entries WHERE id=?`;
        const values = entry_id;
        await client.query(query, values);
        return ;
    }catch(err){
        console.log('deletingAnEntryWithId fail.');
        throw err
    }
}

async function deleteAnEntry(user_id, entry_id){
    client = new SqlClient();
    await client.connect();

    try{
        const [entry] = await client
            .select('entries', `id, DATE_FORMAT(timestamp, '%Y-%m-01') AS month, parent_id`)
            .where({'user_id=?': user_id, 'id=?': entry_id})
            .query()

        if (entry.length===0) throw new CustomError("Invalid access.")
        if (entry[0].parent_id) throw new CustomError("Cannot delete child entry, operate on parent entry instead.")
        client.clear();
        
        const month = entry[0].month
        const [details] = await client
            .select('entryDetails', 'subject_id, amount')
            .where({'id=?': entry_id})
            .query()
            

        await client.transaction();
        await Promise.all([
            deletingAnEntryWithId(client, entry_id),
            updateBalances(client, user_id, month, details)
        ])
        await client.commit();
    
    }catch(err){
        await client.rollback();
        throw err;

    }finally{
        client.close();
    }
}

async function getEntryHistory(user_id, subject_id, start, end){
    const client = new SqlClient();
    await client.connect();

    const toSelect = `
        e.id, DATE_FORMAT(e.timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                "subject", JSON_OBJECT(
                    "id", s.id,
                    "name", s.name,
                    "is_debit", s.is_debit
                ), 
                "amount", ed.amount,
                "description", ed.description)  
        ) AS details
    `
  
    try{
        
        client
            .select('entries')
            .where({'user_id=?': user_id, 'timestamp>=?': start, 'timestamp<=?': end})
            .as('e')
  
            .select('e', toSelect)
            .join('entryDetails as ed', 'e.id=ed.entry_id')
            .join('subjects as s', 's.id=ed.subject_id')
            .group('id')
            .order('timestamp DESC, amount')
        
        if (subject_id) client.where({'s.subject_id=?': subject_id})
            
        const [entryHistory] = await client.query()
        return entryHistory;

    }catch(err){
        throw err;

    }finally{
        client.close();
    }
}

module.exports = {
    getAnEntry: getAnEntry,
    postAnEntry: postAnEntry,
    deleteAnEntry: deleteAnEntry,
    getEntryHistory: getEntryHistory
}