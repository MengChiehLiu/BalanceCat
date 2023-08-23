const {SqlClient} = require('../utils/ORM');

// helper functions
async function gettingStats(client, user_id, thisMonth, lastMonth, codes){
    try{
        const query = `
        WITH b1 AS (
            SELECT 
                s.id, s.name, b.amount, b.month 
            FROM balances as b 
            LEFT JOIN subjects as s ON s.id=b.subject_id 
            WHERE b.user_id=? AND s.id in (?) AND month in (?) 
        ) 
        SELECT 
            b1.name, b1.amount, 
            ((b1.amount-b2.amount)/NULLIF(b2.amount, 0)*100) AS percentage_change 
        FROM b1 LEFT 
        JOIN b1 as b2 ON b1.id=b2.id AND b1.month > b2.month
        ORDER BY b1.id
        `
        const values = [user_id, codes, [thisMonth, lastMonth]]
        const [stats] = await client.query(query, values)
        return stats

    }catch(err){
        console.error('gettingStats fail')
        throw err
    }
}

async function gettingCharts(client, user_id, thisMonth, codes){
    try{
        const query = `
            SELECT s.name, SUM(b.amount) AS amount 
            FROM balances as b 
            LEFT JOIN subjects as s ON s.id=b.subject_id 
            WHERE b.user_id=? AND s.id in (?) AND month=? 
            GROUP BY s.name
            ORDER BY s.id
        `
        const values = [user_id, codes, thisMonth]
        const [charts] = await client.query(query, values)
        return charts

    }catch(err){
        console.error('gettingCharts fail')
        throw err
    }
}

// router functions

async function getStatsCharts(user_id, statCodes, chartCodes){
    const client = new SqlClient()
    await client.connect();

    try{
        const [year, month] = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }).split('/')
        const thisMonth = `${year}/${month}/1`
        const lastMonth = month==1? `${year-1}/12/1`: `${year}/${month-1}/1`

        const [stats, charts] = await Promise.all([
            gettingStats(client, user_id, thisMonth, lastMonth, statCodes),
            gettingCharts(client, user_id, thisMonth, chartCodes)
        ])

        return [stats, charts]

    }catch(err){
        throw err

    }finally{
        await client.close();
    }
}

module.exports = {
    getStatsCharts: getStatsCharts
}
