const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');

// import models
const {deleteAnEntry} = require('../../models/entries');


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

router.delete('/:entry_id([0-9]+)', checkAuthorization, routerDelete)
module.exports = router;
