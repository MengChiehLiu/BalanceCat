const SqlClient = require('../utils/ORM');


async function deregister(client, register_id){
    try{
        const [result] = await client
            .update('registers', {'is_expired=?': 1})
            .where({'register_id=?': register_id})
            .query()
        
        return result.affectedRows === 1; 
    }catch{
        return false;
    }finally{
        client.clear();
    }
}


async function writeOff(client, user_id, register_id, amount){
    try{
        const [result] = await client
            .update('registers', {'book_value=book_value-?': amount})
            .where({'user_id=?': user_id, 'register_id=?': register_id})
            .query()
        
        return result.affectedRows === 1;    
    }catch{
        throw `register_id_${register_id}: write off fail`
    }finally{
        client.clear();
    }
}


async function register(client, user_id, entry_id, detail){
    try{
        const [result] = await client
            .insert('registers', {
                user_id: user_id,
                entry_id: entry_id,
                subject_id: detail.subject_id,
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

module.exports = {
    register: register,
    writeOff: writeOff,
    deregister: deregister
}