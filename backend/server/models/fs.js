const {SqlClient} = require('../utils/ORM');
const {buildHierarchy} = require('../utils/others')


async function getBS(user_id, date){
    const client = new SqlClient();
    await client.connect();

    try{
        let [fs] = await client
            .select('balances')
            .where({'user_id=?': user_id, 'month=?':date})
            .as('b')

            .select('subjects as s', 's.id, s.name, s.is_debit, s.parent_id, COALESCE(b.amount, 0) AS amount')
            .join('b', 's.id=b.subject_id')
            .where({'s.id<?':4000})            
            .query()
        
        return buildHierarchy(fs, null)

    }catch(err){
        throw err;

    }finally{
        await client.close();
    }
}

async function getIS(user_id, date){
    const client = new SqlClient();
    await client.connect();

    try{
        let [is] = await client
            .select('balances')
            .where({'user_id=?': user_id, 'month=?':date})
            .as('b')

            .select('subjects as s', 's.id, s.name, s.is_debit, s.parent_id, COALESCE(b.amount, 0) AS amount')
            .join('b', 's.id=b.subject_id')
            .where({'s.id>=?':4000})            
            .query()
        
        return buildHierarchy(is, null)

    }catch(err){
        throw err;

    }finally{
        await client.close();
    }
}

module.exports = {
    getBS: getBS,
    getIS: getIS
}