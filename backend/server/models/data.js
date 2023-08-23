const {SqlClient} = require('../utils/ORM');
const fs = require('fs');

async function dataInitDB(){
    const client = new SqlClient();
    await client.connect();
    
    try{
        await client.transaction();
        client._query = fs.readFileSync('init.sql', 'utf8');
        await client.query();
        await client.commit();
    }catch(err){
        console.error(err);
        await client.rollback();
    }finally{
        await client.close();
    }
};


module.exports = {
    dataInitDB: dataInitDB
}