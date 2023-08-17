const {SqlClient} = require('../utils/ORM');
const {register} = require('../models/registers')
const {updateBalance} = require('../models/balances')
const {lastUpdate} = require('../models/users')


// helper function
async function insertEntryDetails(client, entry_id, details){

    // console.log('start insertEntryDetails')
    try{
        const query = `INSERT INTO entryDetails (entry_id, subject_id, amount, description) VALUES ?;`
        let values = [[]];
        for (let detail of details) values[0].push([entry_id, detail.subject_id, detail.amount, detail.description]);

        await client.query(query, values)

        // console.log('finish insertEntryDetails')
        return;
    }catch(err){
        console.log(err)
        throw 'insertEntryDetails fail'
    }
}

// route function
async function postAEntry(user_id, details, timestamp, parent_id){
    client = new SqlClient();
    await client.connect();

    try{
        await client.transaction();

        // insert entry
        const [result] = await client
            .insert('entries', {'user_id': user_id, 'timestamp': timestamp, 'parent_id': parent_id})
            .query()

        const entry_id = result.insertId;

        // insert entry details & update balance & register
        await Promise.all([
            insertEntryDetails(client, entry_id, details),
            updateBalance(client, user_id, timestamp, details),
            register(client, user_id, entry_id, timestamp, details),
            lastUpdate(client, user_id, timestamp)
        ]);

        await client.commit();
        return entry_id;
    }catch(err){
        console.log(err);
        await client.rollback();
        return null;

    }finally{
        client.close();
    };
}

async function getEntryHistory(user_id, subject_id, start, end){
    const client = new SqlClient();
    await client.connect();

    const toSelect = `
        e.id, e.timestamp, JSON_ARRAYAGG(
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
        await client.transaction();
        
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
  
        await client.commit();
        return entryHistory;

    }catch(err){
        console.log(err);
        await client.rollback();
        return null;

    }finally{
        client.close();
    }
}

module.exports = {
    postAEntry: postAEntry,
    getEntryHistory: getEntryHistory
}