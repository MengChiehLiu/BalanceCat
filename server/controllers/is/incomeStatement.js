const router = require('express').Router();

// import middlewares
const {checkContentType, checkAuthorization, checkBody, checkDateFormat} = require('../../utils/checkRequest');


// import models
const {getIncomeStatementData} = require('../../models/incomeStatement');

router.get('/', checkAuthorization, checkDateFormat, async(req, res) => {
    const userId = req.user.id; 
    const timestamp = req.query.timestamp;

    let inputDate;
    
    if (timestamp) {
        inputDate = new Date(timestamp);
    } else {
        inputDate = new Date();
    }
    
    
    

    try {
        const results = await getIncomeStatementData(userId, inputDate);
        return res.json({ data: { subjects: results } });
    } catch (error) {
        console.error("Error fetching income statement data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;