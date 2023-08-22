const {SqlClient} = require('../utils/ORM');
const {CustomError} = require('../utils/others');

// support function

async function register(client, user_id, entry_id, timestamp, details){

    try{
        let query = ''
        let values = []

        for (let detail of details){
            // register ar or ap
            if ((detail.subject_id==1103 && detail.amount>0) || (detail.subject_id==2102 && detail.amount<0)){
                query += `INSERT INTO registers (user_id, entry_id, subject_id, timestamp, initial_value, book_value) VALUES (?);`
                values.push([user_id, entry_id, detail.subject_id, timestamp, detail.amount, detail.amount])
            }

            else if (detail.register) {
                // register LA, LL
                if (!detail.register.id){
                    query += `INSERT INTO registers (user_id, entry_id, subject_id, timestamp, initial_value, book_value, expired_in) VALUES (?);`
                    values.push([user_id, entry_id, detail.subject_id, timestamp, detail.amount, detail.amount, detail.register.expired_in])
                }
                // write off register
                else{
                    const book_value = detail.register.book_value
                    const new_book_value = book_value + detail.amount
                    if (book_value*new_book_value < 0) throw new CustomError('Invalid write off operation')
    
                    query += `UPDATE registers SET book_value=?, is_expired=? WHERE id=?;`
                    values.push(new_book_value)
                    values.push(new_book_value===0)
                    values.push(detail.register.id)
                };
            }
        };

        if (query) await client.query(query, values);

        return;
    }catch(err){
        console.log(`register fail`)
        throw err
    }finally{
        client.clear();
    }
}

// router function

async function getRegisters(user_id, type){
    
    // choose condition according to type
    let condition;
    if (type==='assets') condition = 'subject_id > 1200 AND subject_id < 1300'
    else if (type==='liabilities') condition = 'subject_id > 2200 AND subject_id < 2300'
    else if (type==='ar') condition = 'subject_id = 1103'
    else if (type==='ap') condition = 'subject_id = 1104'
    else throw new CustomError('Invalid query, type should be one of assets/liabilities/ar/ap.')

    // query DB start here
    const client = new SqlClient();
    await client.connect();

    const toSelect = `
        r.id, r.initial_value, r.book_value, r.expired_in, r.is_expired, r.entry_id,
        DATE_FORMAT(r.timestamp, '%Y-%m-%d %H:%i:%s') AS timestamp,
        JSON_OBJECT('id', s.id, 'name', s.name, 'is_debit', s.is_debit) AS subject
    `

    try{
        const [registers] = await client
            .select('registers')
            .where({'user_id=?': user_id, [condition]: null, 'is_expired=?': false})
            .as('r')
            .select('r', toSelect)
            .join('subjects as s', 'r.subject_id=s.id')
            .query()
        
        return registers;

    }catch(err){
        throw err;

    }finally{
        client.close();
    }
}


module.exports = {
    register: register,
    getRegisters: getRegisters
}