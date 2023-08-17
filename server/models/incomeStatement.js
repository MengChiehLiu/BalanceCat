const { pool } = require('../utils/ORM');

const { buildHierarchyIS } = require('../utils/others');

async function getIncomeStatementData(userId, inputDate) {
    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw err;
    }

    // 如果inputDate是字符串，直接转换为日期对象
    const startDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), 1)); // 使用 Date.UTC 创建日期
    const endDate = inputDate; // endDate 就是您的 inputDate
    
    // console.log(startDate.toISOString());
    // console.log(endDate.toISOString());

    try {
        const query = `
                WITH EntrySummary AS (
                    SELECT 
                        ed.subject_id,
                        COALESCE(SUM(ed.amount), 0) as total_amount
                    FROM entryDetails ed
                    JOIN entries e ON ed.entry_id = e.id
                    WHERE e.timestamp >= ? 
                    AND e.timestamp < ? 
                    AND e.user_id = ?
                    GROUP BY ed.subject_id
                )
                
                SELECT 
                    s.id AS subject_id, 
                    s.name AS name, 
                    COALESCE(es.total_amount, 0) AS amount,
                    s.is_debit,
                    s.parent_id
                FROM subjects s
                LEFT JOIN EntrySummary es ON s.id = es.subject_id
                WHERE s.id >= 4000
                ORDER BY s.id;
            
            `;

        const [results] = await connection.query(query, [startDate, endDate, userId]);

        // Extract the relevant fields from each result item and create an array of objects
        const subjects = results.map(result => ({
            id: result.subject_id,
            name: result.name,
            amount: result.amount * (result.subject_id.toString().startsWith('4') ? -1 : 1), 
            is_debit: result.is_debit,
            parent_id: result.parent_id
        }));
        console.log("subjects",subjects)
        
        const hierarchy = buildHierarchyIS(subjects, null);
        

        return hierarchy;

    } catch (err) {
        console.error("Failed to run query:", err);
        throw err;
    } finally {
        await connection.release();
    }
}


module.exports = {
    getIncomeStatementData
}
