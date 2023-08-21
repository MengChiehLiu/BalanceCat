const {SqlClient} = require('../utils/ORM');
const {buildHierarchyFS} = require('../utils/others')


async function getFS(user_id, date){
    const client = new SqlClient();
    await client.connect();

    try{
        let [fs] = await client
            .select('balances')
            .where({'user_id=?': user_id, 'month=?':date, 'subject_id<?':4000})
            .as('b')

            .select('subjects as s', 's.id, s.name, s.is_debit, s.parent_id, COALESCE(b.amount, 0) AS amount')
            .join('b', 's.id=b.subject_id')
            .query()
        
        return buildHierarchyFS(fs, null)

    }catch(err){
        throw err;

    }finally{
        client.close();
    }
}

module.exports = {
    getFS: getFS
}