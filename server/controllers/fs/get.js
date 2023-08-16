const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');


// import models
const {getHistoryFS, getCurrentFS} = require('../../models/fs');

async function routerGet(res, user_id, date){
    try{
        const fs = date ? await getHistoryFS(user_id, date) : await getCurrentFS(user_id)
        if (fs) return res.json({data: {subjects: fs}});
        return res.status(400).json({error: 'Invalid Entry'});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/', async(req, res)=>{
    // const user_id = req.user._id;
    const user_id = 1;
    const date = req.query.date

    await routerGet(res, user_id, date);
});

module.exports = router;