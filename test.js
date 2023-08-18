const bcrypt = require('bcrypt');
async function test(){
    const hashedPassword = await bcrypt.hash('test', 10);
    console.log(hashedPassword)
}

test()

