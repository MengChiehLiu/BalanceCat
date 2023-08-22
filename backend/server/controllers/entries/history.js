const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkDateFormat} = require('../../utils/checkRequest');
const toCheck = ['start', 'end']

// import models
const {getEntryHistory} = require('../../models/entries');

async function routerGetHistory(req, res){
    try{
        const user_id = req.user.id;
        const subject_id = req.query.subject_id;
        const start = req.query.start;
        const end = `${req.query.end} 23:59:59`;        

        const entryHistory = await getEntryHistory(user_id, subject_id, start, end);
        return res.json({data: {entries: entryHistory}});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/history', checkAuthorization, checkDateFormat(toCheck), routerGetHistory);
module.exports = router;