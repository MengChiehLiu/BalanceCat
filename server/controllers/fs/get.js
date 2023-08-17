const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');


// import models
const {getHistoryFS, getCurrentFS} = require('../../models/fs');

async function routerGet(res, user_id, month){
    try{
        const fs = month ? await getHistoryFS(user_id, month) : await getCurrentFS(user_id)
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
    const month = req.query.month

    await routerGet(res, user_id, month);
});

module.exports = router;