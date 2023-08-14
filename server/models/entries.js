const SqlClient = require('../utils/ORM');
const {register, writeOff} = require('../models/registers')

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
        

        // register & reformating details
        let values = []

        for (let detail of details){
            let register_id = null;

            if (detail.register) {
                register_id = detail.register.id;
                if (register_id) await writeOff(client, user_id, register_id, detail.amount);
                else register_id = await register(client, user_id, entry_id, detail);
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



module.exports = {
    entriesRecord: entriesRecord
}