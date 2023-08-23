const router = require('express').Router();

// import middlewares
const {checkAuthorization, checkDateFormat} = require('../../utils/checkRequest');

// import models
const {getBS, getIS} = require('../../models/fs');

async function routerGetBS(req, res){
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

        const BS = await getBS(user_id, date)
        return res.json({data: {subjects: BS}});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};


async function routerGetIS(req, res){
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

        const IS = await getIS(user_id, date)
        return res.json({data: {subjects: IS}});

    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/bs', checkAuthorization, checkDateFormat(), routerGetBS);
router.get( '/is', checkAuthorization, checkDateFormat(), routerGetIS);
module.exports = router;