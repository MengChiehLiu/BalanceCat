const router = require('express').Router();

// import middlewares
const {checkContentType, checkAuthorization, checkBody, checkTimestampFormat} = require('../../utils/checkRequest');
const toCheck = ['details', 'timestamp'];

// import models
const {postAnEntry} = require('../../models/entries');

async function routerPost(req, res){
    try{
        const user_id = req.user.id;
        const details = req.body.details;
        const timestamp = req.body.timestamp;
        const parent_id = req.body.parent_id;

        const entry_id = await postAnEntry(user_id, details, timestamp, parent_id);
        return res.json({data: {entry: {id: entry_id}}});

    }catch(err){
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.post( '/', checkAuthorization, checkContentType(), checkBody(toCheck), 
    checkTimestampFormat, routerPost);
module.exports = router;