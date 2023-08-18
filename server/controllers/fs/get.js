const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkTimestampFormat} = require('../../utils/checkRequest');


// import models
const {getFS} = require('../../models/fs');

async function routerGet(res, user_id, month){
    try{
        const fs = await getFS(user_id, month)
        if (fs) return res.json({data: {subjects: fs}});
        return res.status(400).json({error: 'Invalid Entry'});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/', checkAuthorization, checkTimestampFormat, async(req, res)=>{
    const user_id = req.user.id;
    const timestamp = req.query.timestamp
    
    const today = new Date()
    let month;

    if (!timestamp){
        month = new Date(today.getFullYear(), today.getMonth, 1)
    }else{
        month = new Date(`${timestamp.slice(0, 7)}-01`)
        if (month > today) return res.status('400').json({error: 'Future Request Is Not Allowed'})
    }     

    await routerGet(res, user_id, month);
});

module.exports = router;