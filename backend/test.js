const {SqlClient} = require('./server/utils/ORM');

async function test(user_id, entry_id){
    client = new SqlClient();
    await client.connect();

    const toSelect = `
        e.id, DATE_FORMAT(e.timestamp, '%Y-%m-01') AS month, e.parent_id, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                "subject_id", ed.subject_id,
                "amount", (ed.amount*-1)
            )
        ) AS details
    `

    try{
        const [entries] = await client
            .select('entries as e', toSelect)
            .join('entryDetails as ed', 'e.id=ed.entry_id')
            .where({'e.user_id=?': user_id}, {'e.id=?': entry_id, 'e.parent_id=?': entry_id})
            .group('e.id')
            .order('timestamp DESC')
            .query()

       console.log(entries)
    
    }catch(err){
        await client.rollback();
        throw err;

    }finally{
        client.close();
    }
}

test(1, 834)