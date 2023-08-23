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

async function searchBalance(connection, user_id, subject_id, startYear, endYear) {
    console.log("searchBalance parameters:", user_id, subject_id, startYear, endYear);
    const query = `
        SELECT * 
        FROM balances
        WHERE user_id = ? AND subject_id = ? AND YEAR(month) BETWEEN ? AND ?
        ORDER BY month DESC
    `;
    return await connection.query(query, [user_id, subject_id, startYear, endYear]);
}


function getLastNMonths(startyear, endyear) {
    let years = [];
    for (let y = endyear; y >= startyear; y--) {
        years.push({
            label: y.toString(),
            data: new Array(12).fill(0)
        });
    }
    return years;
}


async function getGoal(user_id, startyear, endyear) {
    // console.log("startyear in getGoal",startyear)
    // console.log("endyear in getGoal",endyear)
    // Database
    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw (err)
    }

    try {
        const goalsQuery = `
        SELECT g.id, s.name, g.subject_id, g.amount  
        FROM goals g
        LEFT JOIN subjects s on s.id = g.subject_id
        WHERE user_id = ?
        `;
        const goalsResults = await connection.query(goalsQuery, [user_id]);
        
        // 設置歷史模板
        const historyTemplate = getLastNMonths(startyear, endyear);

        let goals = [];

        for (let i = 0; i < goalsResults[0].length; i++) {
            const goal = goalsResults[0][i];
            const balanceResults = await searchBalance(connection, user_id, goal.subject_id, startyear, endyear);
        
            console.log("balanceResults", balanceResults);
        
            const balanceData = balanceResults[0];
        
            let yearlyHistory = JSON.parse(JSON.stringify(historyTemplate));
        
            balanceData.forEach(b => {
                const year = b.month.getFullYear().toString();
                const month = b.month.getMonth(); // 從0開始計算的月份
        
                const targetYear = yearlyHistory.find(y => y.label === year);
                if (targetYear) {
                    targetYear.data[month] = b.amount;
                }
            });
        
            goals.push({
                id: goal.id,
                subject_id: goal.subject_id,
                name: goal.name,
                amount: goal.amount,
                current_amount: balanceData.find(b => b.month.getMonth() === new Date().getMonth() && b.month.getFullYear() === new Date().getFullYear())?.amount || 0,
                history_amount: yearlyHistory
            });
        }

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