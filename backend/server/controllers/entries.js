const router = require('express').Router();

// import middlewares
const {checkDateFormat, checkContentType, checkAuthorization, checkBody, checkTimestampFormat} = require('../utils/checkRequest');
const toCheck_history = ['start', 'end']
const toCheck_post = ['details', 'timestamp'];


// import models
const {deleteAnEntry, getAnEntry, getEntryHistory, postAnEntry} = require('../models/entries');


async function routerDelete(req, res){
    try{
        const user_id = req.user.id;
        const entry_id = req.params.entry_id;

        await deleteAnEntry(user_id, entry_id)
        return res.json({data: {entry: {id: entry_id}}});
    }catch(err){
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

async function routerGet(req, res){
    try{
        const user_id = req.user.id;
        const entry_id = req.params.entry_id;
        
        const entry = await getAnEntry(user_id, entry_id)
        return res.json({data: {entry: entry}});

    }catch(err){
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

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

async function routerPost(req, res){
    try{
        const user_id = req.user.id;
        const details = req.body.details;
        const timestamp = req.body.timestamp;
        const parent_id = req.body.parent_id;

        const entry_id = await postAnEntry(user_id, details, timestamp, parent_id);
        return res.json({data: {entry: {id: entry_id}}});

    }catch(err){
        if (err.message === 'Duplicate subjects is not allowed.') return res.status(422).json({error: err.message});
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};


router.delete('/:entry_id([0-9]+)', checkAuthorization, routerDelete)
router.get('/:entry_id([0-9]+)', checkAuthorization, routerGet)
router.get( '/history', checkAuthorization, checkDateFormat(toCheck_history), routerGetHistory);
router.post( '/', checkAuthorization, checkContentType(), checkBody(toCheck_post), 
    checkTimestampFormat, routerPost);

module.exports = router;
