const SqlClient = require('../utils/ORM');


async function entriesRecord(user_id, details, timestamp){
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
        
        // handle register state


        // insert entry details
        client.insertColumns('entryDetails', 'entry_id, subject_id, register_id, amount, description');
        let values = []
        for (let datail of details) values.push([entry_id, datail.subject_id, null, datail.amount, datail.description])
        await client.insertValues(values).query()

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



module.exports = {
    entriesRecord: entriesRecord
}