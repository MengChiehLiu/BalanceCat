const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');

// import models
const {getEntryHistory} = require('../../models/entries');

async function routerGet(res, user_id, subject_id, start, end){
    try{
        
        // check time validility
        start = new Date(start);
        end = new Date(end); end.setHours(23, 59, 59, 999);
        if (isNaN(start) || isNaN(end)) return res.status(400).json({error: 'invalid time query'});
        
        const entryHistory = await getEntryHistory(user_id, subject_id, start, end);
        if (entryHistory) return res.json({data: {entries: entryHistory}});
        return res.status(400).json({error: 'Invalid Entry'});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/history', async(req, res)=>{
    // const user_id = req.user._id;
    const user_id = 1;
    const subject_id = req.query.subject_id;
    const start = req.query.start;
    const end = req.query.end;

    await routerGet(res, user_id, subject_id, start, end);
});

module.exports = router;