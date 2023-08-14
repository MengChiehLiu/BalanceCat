const router = require('express').Router();

// import middlewares
const {checkContentType, checkAuthorization, checkBody} = require('../../utils/checkRequest');
const toCheck = ['details', 'description', 'timestamp'];

// import models
const {entriesRecord} = require('../../models/entries');

async function routerPost(res, user_id, details, description, timestamp){
    try{
        const entry_id = await entriesRecord(user_id, details, description, timestamp);
        if (entry_id) return res.json({data: {entry: {id: entry_id}}});
        return res.status(400).json({data});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router checkAuthorization, checkContentType(),
router.post( '/', checkBody(toCheck), async(req, res)=>{
    // const user_id = req.user._id;
    const user_id = 1;
    const details = req.body.details;
    const description = req.body.description;
    const timestamp = req.body.timestamp;

    await routerPost(res, user_id, details, description, timestamp);


});

module.exports = router;