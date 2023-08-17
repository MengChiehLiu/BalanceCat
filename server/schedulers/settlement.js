const SqlClient = require('../utils/ORM');

async function settlement(user_id){
    const client = new SqlClient();
    await client.connect();

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const lastMonth = (month===1) ? `${year-1}-12` : `${year}-${month-1}`


    try{
        await client.transaction();

        // first month
        const [result] = await client
            // last month
            .select('balances')
            .where({'user_id=?': user_id, 'month=?': lastMonth})
            ._as('b').push()

            .select('subjects')
            ._as('s').push()

            // this month
            .select('entries')
            .where({'user_id=?': user_id, 'YEAR(timestamp)=?': year, 'MONTH(timestamp)=?': month})
            .as('e').shift().shift()

            .select('e', toSelect)
            .join('entryDetails as ed', 'e.id=ed.entry_id')
            .join('s', 's.id=ed.subject_id', 'RIGHT')
            .join('b', 's.id=b.subject_id')
            .group('s.id')
            .query()
            

        await client.commit();
        return 
    }catch(err){
        await client.rollback()
    }finally{
        client.close();
    };


}