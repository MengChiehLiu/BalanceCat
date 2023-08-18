const {SqlClient} = require('../utils/ORM');
const {buildHierarchyFS} = require('../utils/others')


async function getFS(user_id, month){
    const client = new SqlClient();
    await client.connect();

    try{
        let [fs] = await client
            .select('balances')
            .where({'user_id=?': user_id, 'month=?':month, 'subject_id<?':3000})
            .as('b')

            .select('b', 's.id, s.name, s.is_debit, s.parent_id, b.amount')
            .join('subjects as s', 's.id=b.subject_id')
            .where({}, {'amount>?': 0, 'id % 100 = ?': 0})
            .query()
        
        return buildHierarchyFS(fs, null)

    }catch(err){
        console.log(err);
        return null;

    }finally{
        client.close();
    }
}



// async function getHistoryFS(user_id, month){
//     const client = new SqlClient();
//     await client.connect();

//     const toSelect = `s.id, s.name, s.is_debit, b.amount`

//     try{
//         await client.transaction();

//         const [historyFS] = await client
//             // last month
//             .select('balances')
//             .where({'user_id=?': user_id, 'month=?': month})
//             .as('b')
            
//             .select('b', toSelect)
//             .join('subjects as s', 's.id=b.subject_id')
//             .where({'s.id<?': 3000})
//             .order('id')
//             .query()

//         await client.commit();
//         return historyFS;

//     }catch(err){
//         console.log(err);
//         await client.rollback();
//         return null;

//     }finally{
//         client.close();
//     }
// }


// async function getCurrentFS(user_id){
//     const client = new SqlClient();
//     await client.connect();

//     const toSelect = `s.id, s.name, s.is_debit, s.parent_id, 
//         CAST(COALESCE(SUM(ed.amount), 0) + COALESCE(b.amount, 0) AS SIGNED) AS amount
//     `

//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const lastMonth = (month===1) ? `${year-1}-12` : `${year}-${month-1}`

    
//     try{
//         await client.transaction();

//         const [currentFS] = await client
//             // last month
//             .select('balances')
//             .where({'user_id=?': user_id, 'month=?': lastMonth})
//             ._as('b').push()

//             .select('subjects')
//             .where({'id<?': 3000})
//             ._as('s').push()

//             // this month
//             .select('entries')
//             .where({'user_id=?': user_id, 'YEAR(timestamp)=?': year, 'MONTH(timestamp)=?': month})
//             .as('e').shift().shift()

//             .select('e', toSelect)
//             .join('entryDetails as ed', 'e.id=ed.entry_id')
//             .join('s', 's.id=ed.subject_id', 'RIGHT')
//             .join('b', 's.id=b.subject_id')
//             .group('s.id')
//             .query()

//         const [hierarchyFS, total] = buildHierarchy(currentFS, null);
//         await client.commit();
        
//         return hierarchyFS;
//     }catch(err){
//         console.log(err);
//         await client.rollback();
//         return null;
//     }finally{
//         client.close();
//     }
// }

module.exports = {
    // getCurrentFS: getCurrentFS,
    getFS: getFS
}