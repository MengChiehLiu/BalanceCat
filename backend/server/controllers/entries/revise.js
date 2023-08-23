const router = require('express').Router();

// import middlewares
const {checkContentType, checkAuthorization, checkBody, checkTimestampFormat} = require('../../utils/checkRequest');
const toCheck = ['details', 'timestamp'];

// import models
const {reviseAnEntry} = require('../../models/entries');

async function routerPostRevise(req, res){
    try{
        const user_id = req.user.id;
        const entry_id = req.params.entry_id;
        const details = req.body.details;
        const timestamp = req.body.timestamp;

        await reviseAnEntry(user_id, entry_id, details, timestamp);
        return res.json({data: {entry: {id: entry_id}}});

    }catch(err){
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.post( '/:entry_id([0-9]+)', checkAuthorization, checkContentType(), checkBody(toCheck), 
    checkTimestampFormat, routerPostRevise);
module.exports = router;