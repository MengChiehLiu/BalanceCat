const {SqlClient} = require('../utils/ORM');


function getThreeIdsString(subject_id){
    let parent = Math.floor(subject_id / 100) * 100
    let grandparent = Math.floor(subject_id / 1000) * 1000
    return `${subject_id}, ${parent}, ${grandparent}`
};

const a_code = 5108;
const l_code = 1101;
const a_codes = getThreeIdsString(a_code);
const l_codes = getThreeIdsString(l_code);


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
            WHERE user_id=${register.user_id} AND month=? AND subject_id in (${getThreeIdsString(register.subject_id)});

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
    }finally{
        client.close();
    }
} 


module.exports = {
    depreciate: depreciate
}