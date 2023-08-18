const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkTimestampFormat} = require('../../utils/checkRequest');


// import models
const {getFS} = require('../../models/fs');

async function routerGet(res, user_id, month){
    try{
        if (new Date(month) > new Date()) return res.status('400').json({error: 'Future Request Is Not Allowed'})
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
    const month = `${timestamp.slice(0, 7)}-01`
    
    await routerGet(res, user_id, month);
});

module.exports = router;