const {SqlClient} = require('../utils/ORM');


// helper function
function getThreeIds(subject_id){
    let parent = Math.floor(subject_id / 100) * 100
    let grandparent = Math.floor(subject_id / 1000) * 1000
    return [subject_id, parent, grandparent]
};

async function updateBalance(client, user_id, timestamp, details){

    const month = `${timestamp.slice(0, 7)}-01`
    
    try{
        // query
        let query = ''
        let values = []
        for (let detail of details){
            query += `UPDATE balances SET amount=amount+? WHERE user_id=? AND subject_id in (?) AND month=?;`
            values.push(detail.amount)
            values.push(user_id)
            values.push(getThreeIds(detail.subject_id))
            values.push(month)
        }

        // update
        const [result] = await client.query(query, values)     

        // if update nothing
        if (result[0].affectedRows === 0) {
            await copyBalance(client, user_id, timestamp)  // copy balance to current month
            await client.query(query, values)  // update again
        };

        return;

    }catch(err){
        console.log(err);
        throw 'updateBalance fail'
    }
}

async function copyBalance(client, user_id, timestamp){

    try{
        let query = 'SELECT last_updated FROM users WHERE id=?'
        let values = [user_id];
        const [result] = await client.query(query, values)
        const last_updated = new Date(result[0].last_updated);
        const startMonth = last_updated.getMonth()+1;
        const startYear = last_updated.getFullYear();
        const today = new Date(timestamp);
        const endMonth = today.getMonth()+1;
        const endYear = today.getFullYear();

        
        query = `
            CREATE TEMPORARY TABLE temp_table AS (
                SELECT user_id, subject_id, amount, month from balances
                WHERE user_id=? and MONTH(month)=? and YEAR(month)=?
            );
            UPDATE temp_table SET amount = 0 WHERE subject_id>=4000;
            `
        values = [user_id, startMonth, startYear];

        for (let year=startYear; year<=endYear; year++){
            for (let month=startMonth+1; month<=endMonth; month++){
                const formattedMonth = month < 10 ? `0${month}` : `${month}`;
                const newDate = `${year}-${formattedMonth}-01`;
                
                query += `
                    UPDATE temp_table SET month = ?;
                    INSERT INTO balances SELECT user_id, subject_id, amount, month FROM temp_table;
                    `
                values.push(newDate)
            }
        }

        await client.query(query, values);
        return;
    }catch(err){
        console.log(err)
        throw 'copyBalance fail'
    }
}


module.exports = {
    updateBalance: updateBalance
}