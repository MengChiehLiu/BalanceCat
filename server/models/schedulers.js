const {SqlClient} = require('../utils/ORM');


// depreciate
function depreciatingGetThreeIds(subject_id){
    let parent = Math.floor(subject_id / 100) * 100
    let grandparent = Math.floor(subject_id / 1000) * 1000
    return `${subject_id}, ${parent}, ${grandparent}`
};

async function depreciatingUpdateRegisters(client, register){
    try{
        const query = `
            UPDATE registers 
            SET book_value=book_value-${register.amount}, expired_in=expired_in-1, is_expired=(expired_in=0)
            WHERE id=${register.id};
        `
        await client.query(query);
        return;
    }catch(err){
        console.log(err);
        throw new Error(`Depreciate fail: UpdateRegisters fail in id ${register.id}`)
    }
}

async function depreciatingInsertEntries(client, register, timestamp, code){
    try{
        const query = `
            INSERT INTO entries (user_id, parent_id, timestamp) 
            VALUES (${register.user_id}, ${register.entry_id}, '${timestamp}');
            SET @inserted_id = LAST_INSERT_ID();

            INSERT INTO entryDetails (entry_id, subject_id, amount, description) 
            VALUES 
                (@inserted_id, ${code}, ${register.amount}, 'depreciation from register_id ${register.id}'),
                (@inserted_id, ${register.subject_id}, ${-register.amount}, 'depreciation from register_id ${register.id}');
        `
        const values = [timestamp]
        await client.query(query, values);
        return;
    }catch(err){
        console.log(err)
        throw new Error(`Depreciate fail: InsertEntries fail in id ${register.id}`)
    }
}

async function depreciatingUpdateBalances(client, register, month, codes){
    try{
        const query = `
            UPDATE balances
            SET amount=amount-${register.amount}
            WHERE user_id=${register.user_id} AND month=? AND subject_id in (${depreciatingGetThreeIds(register.subject_id)});

            UPDATE balances
            SET amount=amount+${register.amount}
            WHERE user_id=${register.user_id} AND month=? AND subject_id in (${codes});
        `
        const values = [month, month]
        await client.query(query, values);
        return;
    }catch(err){
        console.log(err);
        throw new Error(`Depreciate fail: UpdateBalances fail in id ${register.id}`)
    }
}

async function depreciate(){
    const client = new SqlClient();
    await client.connect();

    const a_code = 5108;
    const l_code = 1101;
    const a_codes = depreciatingGetThreeIds(a_code);
    const l_codes = depreciatingGetThreeIds(l_code);

    const timestamp = new Date(); 
    const month = new Date(timestamp.getFullYear(), timestamp.getMonth, 1);

    try{
        // get registers list
        let query = `
            SELECT id, user_id, subject_id, entry_id, ROUND(book_value/expired_in) AS amount
            FROM registers 
            WHERE is_expired = false AND expired_in>0
            `

        const [registers] = await client.query(query)

        // update tables
        let code, codes;

        for (const register of registers){
            if (register.amount> 0) {code=a_code; codes=a_codes}
            else {code=l_code; codes=l_codes}

            try{
                await client.transaction();
                await Promise.all([
                    depreciatingUpdateRegisters(client, register),
                    depreciatingInsertEntries(client, register, timestamp, code),
                    depreciatingUpdateBalances(client, register, month, codes)
                ])
                await client.commit();
            }catch(err){
                console.log(err.message);
                await client.rollback();
            }

            console.log('good')
        }

    }catch(err){
        console.log(err);
        client.rollback();
        throw new Error('schedulers: depreciate fail')

    }finally{
        client.close();
    }
} 

// copyBalances 
async function copyBalances(){

    const client = new SqlClient();
    await client.connect();

    const today = new Date();
    const month = today.getMonth()+1
    const thisMonth = new Date(today.getFullYear(), month, 1)
    const lastMonth = month==1 
                    ? new Date(today.getFullYear()-1, 12, 1)
                    : new Date(today.getFullYear(), month-1, 1)

    try{
        await client.transaction();

        let query = `
            CREATE TEMPORARY TABLE temp_table AS (
                SELECT user_id, subject_id, amount, month from balances
                WHERE month=?
            );

            UPDATE temp_table SET month=?;
            UPDATE temp_table SET amount=0 WHERE subject_id>=4000;

            INSERT INTO balances SELECT user_id, subject_id, amount, month FROM temp_table;
            `
        let values = [lastMonth, thisMonth];

        await client.query(query, values);

        await client.commit();
        return;

    }catch(err){
        console.log(err)
        await client.rollback();
        throw new Error('schedulers: copyBalances fail')

    }finally{
        client.close();
    }
}

module.exports = {
    depreciate: depreciate,
    copyBalances: copyBalances
}