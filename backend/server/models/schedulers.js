const {SqlClient} = require('../utils/ORM');
const {getRelatedIds} = require('../utils/others');

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
        console.error(err);
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
        console.error(err)
        throw new Error(`Depreciate fail: InsertEntries fail in id ${register.id}`)
    }
}

async function depreciatingUpdateBalances(client, register, month, codes){
    try{
        const query = `
            UPDATE balances
            SET amount=amount-${register.amount}
            WHERE user_id=${register.user_id} AND month=? AND subject_id in (?);

            UPDATE balances
            SET amount=amount+${register.amount}
            WHERE user_id=${register.user_id} AND month=? AND subject_id in (?);
        `
        const values = [month, getRelatedIds(register.subject_id), month, codes]
        await client.query(query, values);
        return;
    }catch(err){
        console.error(err);
        throw new Error(`Depreciate fail: UpdateBalances fail in id ${register.id}`)
    }
}

async function depreciate(year=null, month=null){
    const client = new SqlClient();
    await client.connect();

    const a_code = 5108;
    const l_code = 1101;
    const a_codes = getRelatedIds(a_code);
    const l_codes = getRelatedIds(l_code);

    if (!year && !month)
        [year, month] = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }).split('/');
    
    const timestamp = `${year}/${month}/28`;
    const date = `${year}/${month}/1`;

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
                    depreciatingUpdateBalances(client, register, date, codes)
                ])
                await client.commit();
            }catch(err){
                console.error(err.message);
                await client.rollback();
            }

            console.log('good')
        }

    }catch(err){
        console.error(err);
        client.rollback();
        throw new Error('schedulers: depreciate fail')

    }finally{
        client.close();
    }
} 

// copyBalances 
async function copyBalances(year=null, month=null){

    const client = new SqlClient();
    await client.connect();

    if (!year && !month){
        [year, month] = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }).split('/');
    }
    const thisMonth = `${year}/${month}/1`
    const lastMonth = month==1 ? `${year-1}/12/1` : `${year}/${month-1}/1`

    try{
        await client.transaction();

        let query = `
            -- 臨時表1
            CREATE TEMPORARY TABLE temp_table AS (
                SELECT user_id, subject_id, amount, month from balances
                WHERE month=?
            );
            
            -- 臨時表2
            CREATE TEMPORARY TABLE temp_table_2 AS (
                SELECT user_id, amount
                FROM temp_table
                WHERE subject_id=3200
            );
            
            -- 將當期損益移至保留盈餘
            UPDATE temp_table AS t1
            JOIN temp_table_2 AS t2 ON t1.user_id = t2.user_id
            SET t1.amount = t2.amount, t2.amount = 0
            WHERE t1.subject_id = 3100;

            -- 損益歸零
            UPDATE temp_table SET amount=0 WHERE subject_id>=3200;

            -- 更新月份
            UPDATE temp_table SET month=?;
            
            -- 插入餘額
            INSERT INTO balances SELECT user_id, subject_id, amount, month FROM temp_table;
            
            -- 清除臨時表
            DROP TEMPORARY TABLE temp_table;
            DROP TEMPORARY TABLE temp_table_2;
            `
        let values = [lastMonth, thisMonth];

        await client.query(query, values);

        await client.commit();
        return;

    }catch(err){
        console.error(err)
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