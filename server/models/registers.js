const {SqlClient} = require('../utils/ORM');

// support function

async function register(client, user_id, entry_id, timestamp, details){
    // console.log('start register')

    try{
        let query = ''
        let values = []

        for (let detail of details){
            if (!detail.register) continue // no operation needed
            if (!detail.register.id){ // not register yet
                query += `INSERT INTO registers (user_id, entry_id, subject_id, timestamp, initial_value, book_value, expired_in) VALUES (?);`
                values.push([user_id, entry_id, detail.subject_id, timestamp, detail.amount, detail.amount, detail.register.expired_in])
            }else{
                const book_value = detail.register.book_value
                const new_book_value = book_value + amount
                if (book_value*new_book_value < 0) throw 'Invalid write off operation'

                query += `UPDATE registers SET book_value=?, is_expired=? WHERE id=?;`
                values.push(new_book_value)
                values.push(new_book_value===0)
                values.push(detail.register.id)
            };
        };

        if (query) await client.query(query, values);

        // console.log('finish register')
        return;
    }catch(err){
        console.log(err)
        throw `register fail`
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
        r.id, r.initial_value, r.book_value, r.expired_in, r.is_expired, r.entry_id,
        DATE_FORMAT(r.timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp,
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
    getRegisters: getRegisters
}