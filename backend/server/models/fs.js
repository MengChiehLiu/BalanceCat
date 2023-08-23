const {SqlClient} = require('../utils/ORM');
const {buildHierarchyFS} = require('../utils/others')


async function getFS(user_id, date){
    const client = new SqlClient();
    await client.connect();

    try{
        let [fs] = await client
            .select('subjects as s', 's.id, s.name, s.is_debit, s.parent_id, COALESCE(b.amount, 0)')
            .join('balances as b', 's.id=b.subject_id')
            .where({'s.id<?':4000, 'b.user_id=?': user_id, 'b.month=?':date})            
            .query()
        
        return buildHierarchyFS(fs, null)

    }catch(err){
        throw err;

    }finally{
        await client.close();
    }
}

module.exports = {
    getFS: getFS
}