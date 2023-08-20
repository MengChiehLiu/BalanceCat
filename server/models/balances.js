const {SqlClient} = require('../utils/ORM');
const {getRelatedIds} = require('../utils/others');


async function updateBalances(client, user_id, month, details){
    
    try{
        // query
        let query = ''
        let values = []
        for (let detail of details){
            if (detail.subject_id<=3100)
                query += `UPDATE balances SET amount=amount+? WHERE user_id=? AND subject_id in (?) AND month>=?;`
            else
                query += `UPDATE balances SET amount=amount+? WHERE user_id=? AND subject_id in (?) AND month=?;`
                query += `UPDATE balances SET amount=amount+? WHERE user_id=? AND subject_id in (3000, 3100) AND month>?;`
            values.push(detail.amount)
            values.push(user_id)
            values.push(getRelatedIds(detail.subject_id))
            values.push(month)
        }

        await client.query(query, values)     

        return;

    }catch(err){
        console.log('updateBalance fail');
        throw err
    }
}


module.exports = {
    updateBalances: updateBalances
}