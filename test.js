const SqlClient = require('./server/utils/ORM');
const amount = -100000
async function test(){
    client = new SqlClient();
    await client.connect();
    let [book_value] = await client
        .select('registers', 'subject_id, book_value')
        .where({'id=?': 1, 'user_id=?': 1, 'expired_in': null, 'is_expired=?': 0})
        .query()
    
    book_value = book_value[0].book_value
    const is_debit = book_value > 0
    book_value += amount
    

    if ((is_debit && book_value<0) || ((!is_debit) && book_value>0)) throw 'negative balance'
    if (book_value === 0) 
    await client
        .update('registers', {})
        .where({'id=?': 1, 'user_id=?': 1, 'expired_in': null, 'is_expired=?': 0})
        .query()
    

}

test()

