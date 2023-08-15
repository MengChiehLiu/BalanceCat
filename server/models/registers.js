const SqlClient = require('../utils/ORM');

// support function

async function writeOff(client, user_id, register_id, amount){
    try{
        // chack validility 
        let [book_value] = await client
        .select('registers', 'subject_id, book_value')
        .where({'id=?': register_id, 'user_id=?': user_id, 'expired_in': null, 'is_expired=?': 0})
        .query()
        
        book_value = book_value[0].book_value
        const is_debit = book_value > 0
        book_value += amount
        if ((is_debit && book_value<0) || ((!is_debit) && book_value>0)) throw 'balance illegal'
        client.clear()

        // write off
        await client
            .update('registers', {'book_value=?': book_value, 'is_expired=?': book_value===0})
            .where({'id=?': register_id})
            .query()
        
    }catch(err){
        console.log(err);
        throw `register_id_${register_id}: write off fail`;
    }finally{
        client.clear();
    }
}

async function register(client, user_id, entry_id, detail, timestamp){
    try{
        const [result] = await client
            .insert('registers', {
                user_id: user_id,
                entry_id: entry_id,
                subject_id: detail.subject_id,
                timestamp: timestamp,
                initial_value: detail.amount,
                book_value: detail.amount,
                expired_in: detail.register.expired_in
            })
            .query()
        return result.insertId;    
    }catch{
        throw `entry_id_${entry_id}: register fail`
    }finally{
        client.clear();
    }
}

// router function

async function getRegisters(user_id, type){
    let condition;
    if (type==='assets') condition = 'subject_id > 1200 AND subject_id < 1300'
    else if (type==='liabilities') condition = 'subject_id > 2200 AND subject_id < 2300'
    else if (type==='ar') condition = 'subject_id = 1103'
    else if (type==='ap') condition = 'subject_id = 1104'
    else throw 'invalid query'

    const toSelect = `
        r.id, r.timestamp, r.initial_value, r.book_value, r.expired_in, r.is_expired, r.entry_id,
        JSON_OBJECT('id', s.id, 'name', s.name, 'is_debit', s.is_debit) AS subject
    `

    client = new SqlClient();
    await client.connect();

    try{
        await client.transaction();
        const [registers] = await client
            .select('registers')
            .where({'user_id=?': user_id, [condition]: null, 'is_expired=?': false})
            .as('r')
            .select('r', toSelect)
            .join('subjects as s', 'r.subject_id=s.id')
            .query()
        
        await client.commit();
        return registers;
    }catch(err){
        console.log(err);
        await client.rollback();
        return null;
    }finally{
        client.close();
    }
}


module.exports = {
    register: register,
    writeOff: writeOff,
    getRegisters: getRegisters
}