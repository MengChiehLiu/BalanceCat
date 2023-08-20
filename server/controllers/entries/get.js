const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');

// import models
const {getAnEntry} = require('../../models/entries');


async function routerGet(req, res){
    try{
        const user_id = req.user.id;
        const entry_id = req.params.entry_id;
        
        const entry = await getAnEntry(user_id, entry_id)
        if (entry) return res.json({data: {entry: entry}});
        return res.status(400).json({error: 'Invalid Entry'});
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

router.get('/:entry_id([0-9]+)', checkAuthorization, routerGet)
module.exports = router;
