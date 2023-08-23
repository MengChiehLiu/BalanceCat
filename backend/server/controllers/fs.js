const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkDateFormat} = require('../utils/checkRequest');

// import models
const {getFS} = require('../models/fs');

async function routerGet(req, res){
    try{
        const user_id = req.user.id;
        let date = req.query.timestamp

        if (!date){
            const [year, month] = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }).split('/')
            date = `${year}/${month}/1`
        }else{
            date = `${date.slice(0, 7)}-01`
            if (new Date(date) > new Date()) return res.status(400).json({error: 'Future Request Is Not Allowed'})
        }

        const fs = await getFS(user_id, date)
        return res.json({data: {subjects: fs}});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/', checkAuthorization, checkDateFormat(), routerGet);
module.exports = router;