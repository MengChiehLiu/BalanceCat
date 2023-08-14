const router = require('express').Router();

// import models
const {dataInitDB} = require('../../models/data');

// router
router.put( '/db', async(req, res)=>{
    try{
        await dataInitDB()
        res.json({message: 'Success :)'})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Fail :('})
    };
});

module.exports = router;