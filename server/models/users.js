

async function lastUpdate(client, user_id, timestamp){
    try{
        const query = `UPDATE users SET last_updated=? WHERE id=?`
        const values = [timestamp, user_id]
        await client.query(query, values)
    }catch(err){
        console.log(err)
        throw 'lastUpdate fail'
    }
}

module.exports = {
    lastUpdate: lastUpdate
}