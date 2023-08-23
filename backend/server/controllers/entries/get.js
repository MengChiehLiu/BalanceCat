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
        return res.json({data: {entry: entry}});

    }catch(err){
        if (err.name === 'CustomError') return res.status(400).json({error: err.message});
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

router.get('/:entry_id([0-9]+)', checkAuthorization, routerGet)
module.exports = router;
