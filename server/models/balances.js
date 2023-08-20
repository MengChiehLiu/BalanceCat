const {SqlClient} = require('../utils/ORM');
const {getRelatedIds} = require('../utils/others');


// helper function
function getRelatedIds(subject_id){
    let parent = Math.floor(subject_id / 100) * 100
    let grandparent = Math.floor(subject_id / 1000) * 1000
    if (subject_id >= 4000) return [subject_id, parent, grandparent, 3000, 3200]
    else return [subject_id, parent, grandparent]
};

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
                query += `UPDATE balances SET amount=amount+? WHERE user_id=? AND subject_id=3100 AND month>?;`
            values.push(detail.amount)
            values.push(user_id)
            values.push(getRelatedIds(detail.subject_id))
            values.push(month)
        }

        await client.query(query, values)     


        return;

    }catch(err){
        console.log(err);
        throw 'updateBalance fail'
    }
}



module.exports = {
    updateBalances: updateBalances
}