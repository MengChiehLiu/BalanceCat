const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../../utils/checkRequest');

// import models
const {getRegisters} = require('../../models/registers');

async function routerGet(res, user_id, type){
    try{
        const registers = await getRegisters(user_id, type);
        if (registers) return res.json({data: {registers: registers}});
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
    const type = req.query.type

    await routerGet(res, user_id, type);
});

module.exports = router;