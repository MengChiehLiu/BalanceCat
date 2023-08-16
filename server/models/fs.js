const SqlClient = require('../utils/ORM');
const {firstDateOfCurrentMonth, lastDateOfPreviousMonth, buildHierarchy} = require('../utils/others')


async function getHistoryFS(user_id, dateString){
    const client = new SqlClient();
    await client.connect();

    const toSelect = `s.id, s.name, s.is_debit, b.amount`

    try{
        await client.transaction();

        const [historyFS] = await client
            // last month
            .select('balances')
            .where({'user_id=?': user_id, 'date=?': dateString})
            .as('b')
            
            .select('b', toSelect)
            .join('subjects as s', 's.id=b.subject_id')
            .where({'s.id<?': 4000})
            .order('id')
            .query()

        await client.commit();
        return historyFS;

    }catch(err){
        console.log(err);
        await client.rollback();
        return null;

    }finally{
        client.close();
    }
}


async function getCurrentFS(user_id){
    const client = new SqlClient();
    await client.connect();

    const toSelect = `s.id, s.name, s.is_debit, s.parent_id, 
        CAST(COALESCE(SUM(ed.amount), 0) + COALESCE(b.amount, 0) AS SIGNED) AS amount
    `

    const thisMonth = firstDateOfCurrentMonth();
    const lastMonth = lastDateOfPreviousMonth();

    
    try{
        await client.transaction();

        const [currentFS] = await client
            // last month
            .select('balances')
            .where({'user_id=?': user_id, 'date=?': lastMonth})
            ._as('b').push()

            .select('subjects')
            .where({'id<?': 3000})
            ._as('s').push()

            // this month
            .select('entries')
            .where({'user_id=?': user_id, 'timestamp>=?': thisMonth})
            .as('e').shift().shift()

            .select('e', toSelect)
            .join('entryDetails as ed', 'e.id=ed.entry_id')
            .join('s', 's.id=ed.subject_id', 'RIGHT')
            .join('b', 's.id=b.subject_id')
            .group('s.id')
            .query()

        await client.commit();
        const [hierarchyFS, total] = buildHierarchy(currentFS, null);
        return hierarchyFS;
    }catch(err){
        console.log(err);
        await client.rollback();
        return null;
    }finally{
        client.close();
    }
}

module.exports = {
    getCurrentFS: getCurrentFS,
    getHistoryFS: getHistoryFS
}