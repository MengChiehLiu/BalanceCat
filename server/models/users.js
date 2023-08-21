
const { pool } = require('../utils/ORM');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// user's latest update time
async function lastUpdate(client, user_id, timestamp){
    try{
        const query = `UPDATE users SET last_updated=GREATEST(?, last_updated) WHERE id=?`
        const values = [timestamp, user_id]
        await client.query(query, values)
    }catch(err){
        console.log(err)
        throw 'lastUpdate fail'
    }
}


// 密鑰
const secretKey = process.env.secretKey; 

// 檢查郵件格式是否有效
async function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  
// findUserByEmail
async function findUserByEmail(connection, email){
    const query = `
        SELECT * FROM users WHERE email = ?
    `
    const [rows] = await connection.query(query,[email])
    if (rows.length > 0) {
        return rows[0]
    } else {
        return null
    }
} 

// findUserById
async function findUserById(connection, id) {
    const query = `
        SELECT id, name, email, last_updated FROM users WHERE id = ?
    `;
    const [rows] = await connection.query(query, [id]);
    //console.log("rows",rows)
    if (rows.length > 0) {
        return rows[0];  // Return the entire user object, not just the ID
    } else {
        return null;
    }
}

// Default Balances
async function insertZeroAmountForAllSubjects(connection, user_id, month) {
    try {
        const subjectIds = [
            1000, 1100, 1101, 1102, 1103, 
            1200, 1201, 1202, 1203, 1204, 1205, 1206,
            2000, 2100, 2101, 2102, 2103,
            2200, 2201, 2202, 2203, 2204,
            3000, 3100, 3200,
            4000, 4100, 4101, 4102, 4103, 
            4200, 4201, 4202, 4203,
            5000, 5100, 5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109,
            5200, 5201, 5202, 5203, 5204, 5205, 5206, 5207, 5208
        ];
        // 這將創建 "(?, ?, 0, ?), (?, ?, 0, ?), ..." 這樣的字符串
        const valuesPlaceholder = subjectIds.map(() => "(?, ?, 0, ?)").join(", ");

        const insertQuery = `
            INSERT INTO balances (user_id, subject_id, amount, month)
            VALUES ${valuesPlaceholder}
        `;

        const params = [];
        subjectIds.forEach(id => {
            params.push(user_id, id, month);
        });

        
        const [results] = await connection.query(insertQuery, params);
        //console.log("balance results",results)

        console.log("Successfully inserted zero amount for all subjects.");
    } catch (err) {
        console.error("Failed to insert zero amount:", err);
        throw err;
    }
}



// Signup
async function signUpUsers(name, email, password, last_updated) {
    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw err;
    }

    // 開始事務
    await connection.beginTransaction(); 

    // Signup
    try {
        const query = `
            INSERT INTO users (name, email, password, last_updated)  VALUES (?, ?, ?, ?)
        `;

        // check email format
        const  emailIsValid = await isValidEmail(email);
        if ( !emailIsValid){
            throw new Error('Invalid email');
        }

        // check if user already existed
        const existingUserId = await findUserByEmail(connection, email);

        if (existingUserId) {
            throw new Error("Email already existed");
        }

        // 密碼加密      
        const hashedPassword = await bcrypt.hash(password, 10); // 使用 bcrypt 對密碼進行加密

        // 將使用者資料放到資料庫中
        const result = await connection.query(query, [name, email, hashedPassword, last_updated]);
        const userId = result[0].insertId;


        // Retrieve the inserted user's data
        const userData = await findUserById(connection, userId);

        // 更新balances
        const yearAndMonth = last_updated.toISOString().slice(0, 7) + "-01";
        await insertZeroAmountForAllSubjects(connection, userId, yearAndMonth)

        // 生成 Access Token
        const userResponse = {
            id: userId,
            name: name,
            email: email,
            };
        const accessToken = jwt.sign(userResponse, secretKey);

        // 生成回覆
        const Data = {
            "access_token": accessToken,
            "user": {
                id: userData.id,
                name: userData.name,
                email:userData.email
            }
        }

        // 提交事務
        await connection.commit(); 


        return Data;
    } catch (err) {
        console.error("Failed to run query:", err);
        throw err;
    } finally {
        await connection.release();
    }
}

// Signin
async function signInUsers(email, password) {

    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw err;
    }


    // 檢查email是否存在
    const user = await findUserByEmail(connection, email);
    if (!user) {
        throw new Error("User not found");
    }
    //console.log("user", user)

    // 使用bcrypt進行密碼比對
    const isValidPassword = await bcrypt.compare(password, user.password);

    //console.log("isValidPassword",isValidPassword)
    if (!isValidPassword) {
        throw new Error("Invalid password");
    }

    // 生成 Access Token
    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    const accessToken = jwt.sign(userResponse, secretKey);

    // 生成回覆
    const responseData = {
        "access_token": accessToken,
        "user": {
            id: user.id,
            name: user.name,
            email:user.email
        }
    }

    return responseData;
}

// User's Picture
async function updateUserPicture(userId, pictureUrl) {
    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw err;
    }

    try {
      const query = 'UPDATE users SET picture = ? WHERE id = ?';
      await connection.query(query, [pictureUrl, userId]);
    } catch (error) {
      console.error('Error updating user picture:', error);
      throw error;
    } finally {
        await connection.release();
    }
}


// User's Memo
async function updateUserMemo(user_id, title, content){

    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("[updateUserMemo] Failed to get connection:");
        throw err;
    }

    try {
        const query = 'UPDATE users SET memo_title=?, memo_content=? WHERE id=?';
        await connection.query(query, [title, content, user_id]);
        return;

    } catch(err){
        connection.error('[updateUserMemo] Error updating user memo:');
        throw err;
    
    } finally {
        connection.release();
    }
}

// User's info
async function getUserInfo(user_id){

    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("[getUserInfo] Failed to get connection:");
        throw err;
    }

    try {
        const query = 'SELECT name, picture, memo_title, memo_content FROM users WHERE id=?';
        const [infos] = await connection.query(query, [user_id]);

        return infos[0];

    } catch(err){
        console.error('[getUserInfo] Error getting user info:');
        throw err;
    
    } finally {
        connection.release();
    }
}

module.exports = { 
  signUpUsers: signUpUsers,
  signInUsers: signInUsers,
  lastUpdate: lastUpdate,
  updateUserPicture: updateUserPicture,
  updateUserMemo: updateUserMemo,
  getUserInfo: getUserInfo
}


