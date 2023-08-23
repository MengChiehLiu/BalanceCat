const { pool } = require('../utils/ORM');

const { buildHierarchyIS } = require('../utils/others');

const defaultData = {
    "data": {
        "subjects": [
            {
                "id": 4000,
                "name": "收入",
                "is_debit": 0,
                "amount": 0,
                "subjects": [
                    {
                        "id": 4100,
                        "name": "經常性收入",
                        "is_debit": 0,
                        "amount": 0,
                        "subjects": [
                            {
                                "id": 4101,
                                "name": "薪資收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 4102,
                                "name": "利息收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 4103,
                                "name": "其他",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            }
                        ]
                    },
                    {
                        "id": 4200,
                        "name": "非經常性收入",
                        "is_debit": 0,
                        "amount": 0,
                        "subjects": [
                            {
                                "id": 4201,
                                "name": "兼職收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 4202,
                                "name": "中獎收入",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 4203,
                                "name": "其他",
                                "is_debit": 0,
                                "amount": 0,
                                "subjects": null
                            }
                        ]
                    }
                ]
            },
            {
                "id": 5000,
                "name": "支出",
                "is_debit": 1,
                "amount": 0,
                "subjects": [
                    {
                        "id": 5100,
                        "name": "經常性支出",
                        "is_debit": 1,
                        "amount": 0,
                        "subjects": [
                            {
                                "id": 5101,
                                "name": "伙食支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5102,
                                "name": "治裝支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5103,
                                "name": "住房支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5104,
                                "name": "交通支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5105,
                                "name": "教育支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5106,
                                "name": "娛樂支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5107,
                                "name": "孝親費",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5108,
                                "name": "折舊費用",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5109,
                                "name": "其他",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            }
                        ]
                    },
                    {
                        "id": 5200,
                        "name": "非經常性支出",
                        "is_debit": 1,
                        "amount": 0,
                        "subjects": [
                            {
                                "id": 5201,
                                "name": "伙食支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5202,
                                "name": "治裝支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5203,
                                "name": "住房支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5204,
                                "name": "交通支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5205,
                                "name": "教育支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5206,
                                "name": "娛樂支出",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5207,
                                "name": "孝親費",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5208,
                                "name": "折舊費用",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            },
                            {
                                "id": 5209,
                                "name": "其他",
                                "is_debit": 1,
                                "amount": 0,
                                "subjects": null
                            }
                        ]
                    }
                ]
            }
        ]
    }
};


async function getIncomeStatementData(userId, inputDate) {
    let connection;
    try {
        connection = await pool.getConnection();
    } catch (err) {
        console.error("Failed to get connection:", err);
        throw err;
    }

    try {
        const query = `
                SELECT 
                    b.subject_id AS subject_id, 
                    s.name AS name, 
                    COALESCE(b.amount, 0) AS amount,
                    s.is_debit,
                    s.parent_id
                FROM balances b
                LEFT JOIN subjects s ON b.subject_id = s.id
                WHERE s.id >= 4000 AND user_id = ? AND month = ?  
                ORDER BY s.id;
            `;

        const [results] = await connection.query(query, [userId, inputDate]);

        // 如果查詢結果為空，返回預設的資料結構
        if (results.length === 0) {
            return defaultData;
        } else {         
            // Extract the relevant fields from each result item and create an array of objects
            subjects = results.map(result => ({
                id: result.subject_id,
                name: result.name,
                amount: result.amount * (result.subject_id.toString().startsWith('4') ? -1 : 1), 
                is_debit: result.is_debit,
                parent_id: result.parent_id
            }));
            console.log("subjects",subjects)
            const hierarchy = buildHierarchyIS(subjects, null);
            return { data: { subjects: hierarchy } };
    
        }



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
