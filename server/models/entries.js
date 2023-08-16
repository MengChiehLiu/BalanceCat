const SqlClient = require('../utils/ORM');
const {register, writeOff} = require('../models/registers')

async function postAEntry(user_id, details, timestamp){
    client = new SqlClient();
    await client.connect();

    try{
        await client.transaction();

        // insert entry
        const [result] = await client
            .insert('entries', {'user_id': user_id, 'timestamp': timestamp})
            .query()

        const entry_id = result.insertId;
        client.clear();
        

        // register & reformating details
        let values = []

        for (let detail of details){
            let register_id = null;

            if (detail.register) {
                register_id = detail.register.id;
                if (register_id) await writeOff(client, user_id, register_id, detail.amount);
                else register_id = await register(client, user_id, entry_id, detail, timestamp);
            }
            
            values.push([entry_id, detail.subject_id, register_id, detail.amount, detail.description]);
        }

        // insert entry details
        client.insertColumns('entryDetails', 'entry_id, subject_id, register_id, amount, description');
        await client.insertValues(values).query();

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
                "register_id", ed.register_id,
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