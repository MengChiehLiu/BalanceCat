const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkDateFormat} = require('../utils/checkRequest');


// import models
const {getIncomeStatementData} = require('../models/incomeStatement');

router.get('/', checkAuthorization, checkDateFormat(), async(req, res) => {
    const userId = req.user.id; 
    const inputDate = req.query.timestamp;
    console.log("input date",inputDate)

    try {
        const results = await getIncomeStatementData(userId, inputDate);
        return res.json(results);
    } catch (error) {
        console.error("Error fetching income statement data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;