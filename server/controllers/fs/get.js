const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkDateFormat} = require('../../utils/checkRequest');

// import models
const {getFS} = require('../../models/fs');

async function routerGet(req, res){
    try{
        const user_id = req.user.id;
        let timestamp = req.query.timestamp

        if (!timestamp){
            const [year, month] = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }).split('/')
            timestamp = `${year}/${month}/1`
        }else{
            timestamp = `${timestamp.slice(0, 7)}-01`
            if (new Date(timestamp) > new Date()) return res.status('400').json({error: 'Future Request Is Not Allowed'})
        }

        const fs = await getFS(user_id, timestamp)
        if (fs) return res.json({data: {subjects: fs}});
        return res.status(400).json({error: 'Invalid Entry'});

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/', checkAuthorization, checkDateFormat(), routerGet);
module.exports = router;