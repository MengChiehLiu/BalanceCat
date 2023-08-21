const { pool } = require('../utils/ORM');

async function searchGoal(connection, user_id, subject_id) {
    try {
        const query = `
        SELECT id FROM goals WHERE user_id = ? AND subject_id = ?
        `;
        const result = await connection.query(query, [user_id, subject_id]);
        console.log(result)

        // Check if there is a result
        if (result[0].length > 0) {
            return result[0].id;
        } else {
            return null;
        }
        
    } catch(err) {
        console.error("Failed to run query:", err);
        throw err;
    }
}

async function setGoal(user_id, subject_id, amount){
    // Database
    let connection;
    try{
        connection = await pool.getConnection();
    } catch(err) {
        console.error("Failed to get connection:",err);
        throw(err)
    }

    // Set goal
    try{
        
        // Check goal
        const goalId = await searchGoal(connection, user_id, subject_id);
        if (goalId === null) {
            const query = `
            INSERT INTO goals (user_id, subject_id, amount) VALUES (?, ?, ?) 
            `;
            const result = await connection.query(query, [user_id, subject_id, amount]);
            return result[0].insertId;
        } else {
            throw new Error("Goal already existed");
        }
        
    } catch(err) {
        console.error("Failed to run query:",err);
        throw err;
    } finally {
        await connection.release();
    }
}

async function updateGoal(id, user_id, amount){
    // Database
    let connection;
    try{
        connection = await pool.getConnection();
    } catch(err) {
        console.error("Failed to get connection:",err);
        throw(err)
    }

    // Update goal
    try{
        const query = `
        UPDATE goals SET amount=? WHERE id = ? AND user_id = ?  
        `;
        const result = await connection.query(query, [amount, id, user_id]);

        if (result[0].affectedRows > 0){
            return id;
        } else {
            throw new Error("No rows were updated");
        }    
    } catch(err) {
        console.error("Failed to run query:",err)
        throw err;
    } finally {
        await connection.release();
    }
}

async function deleteGoal(id, user_id){
    // Database
    let connection;
    try{
        connection = await pool.getConnection();
    } catch(err) {
        console.error("Failed to get connection:",err);
        throw(err)
    }

    // Delete goal
    try{
        const query = `
        DELETE FROM goals WHERE id = ? AND user_id = ? 
        `;
        const result = await connection.query(query, [id, user_id]);

        if (result[0].affectedRows > 0){
            return id;
        } else {
            throw new Error("No rows were deleted");
        }    
    } catch(err) {
        console.error("Failed to run query:",err)
        throw err;
    } finally {
        await connection.release();
    }
}

async function searchBalance(connection, user_id, subject_id, startMonth, currentMonth) {
    const query = `
        SELECT * 
        FROM balances
        WHERE user_id = ? AND subject_id = ? AND month BETWEEN ? AND ?
        ORDER BY month DESC
    `;
    return await connection.query(query, [user_id, subject_id, startMonth, currentMonth]);
}

async function getGoal (user_id, inputDate, duration) {
    // Database
    let connection;
    try{
        connection = await pool.getConnection();
    } catch(err) {
        console.error("Failed to get connection:",err);
        throw(err)
    }

    // getGoal 
    try {

        const goalsQuery = `
        SELECT g.id, s.name, g.subject_id, g.amount  
        FROM goals g
        LEFT JOIN subjects s on s.id = g.subject_id
        WHERE user_id = ?
        `;
        const goalsResults = await connection.query(goalsQuery, [user_id]);
        console.log("goalsResults:", goalsResults);
        
        // 计算时间范围
        const startMonth = new Date(inputDate);
        if (duration) {
            startMonth.setUTCMonth(startMonth.getUTCMonth() - duration);
        } else {
            startMonth.setUTCMonth(startMonth.getUTCMonth() - 6);
        }
        startMonth.setUTCDate(1);
        console.log("startMonth",startMonth)

        const endMonth = new Date(inputDate);
        endMonth.setUTCDate(1);  // 设置为每个月的第一天
        console.log("endMonth",endMonth)     
    
        let goals = [];
    
        for (let i = 0; i < goalsResults[0].length; i++) {
            const goal = goalsResults[0][i];
            const balanceResults = await searchBalance(connection, user_id, goal.subject_id, startMonth, endMonth);
            const currentMonthString = endMonth.toISOString().slice(0, 7);  // 例如："2023-08"
            console.log("currentMonthString",currentMonthString)
            const balanceData = balanceResults[0];
            
            // 找到當前月份的資料以獲取當前餘額
            const currentBalance = balanceData.find(b => b.month === currentMonthString) || { amount: 0 };
            
            // 过滤掉当前月份
            const historyData = balanceData.filter(b => b.month !== currentMonthString);
            
            goals.push({
                id: goal.id,
                subject_id: goal.subject_id,
                name: goal.name,
                amount: goal.amount,
                current_amount: currentBalance.amount, // 使用找到的當前餘額
                history_amount: historyData.map(b => {
                    return {
                        month: b.month.toISOString().slice(0, 7),
                        amount: b.amount
                    }
                })
            });}
           
            return { data: { goals } };
    } catch (err) {
        console.error("Failed to get goals:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}




module.exports = {
    setGoal,
    updateGoal,
    deleteGoal,
    getGoal
}