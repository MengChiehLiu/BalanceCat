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

            .select('b', 's.id, s.name, s.is_debit, s.parent_id, b.amount')
            .join('subjects as s', 's.id=b.subject_id')
            .where({}, {'amount>?': 0, 'id % 100 = ?': 0})
            .query()
        
        return buildHierarchyFS(fs, null)

    }catch(err){
        console.log(err);
        return null;

    }finally{
        client.close();
    }
}

module.exports = {
    getFS: getFS
}