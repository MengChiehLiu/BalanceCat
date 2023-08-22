const router = require('express').Router();

// import models
const {dataInitDB} = require('../../models/data');

/**
 * @swagger
 * /api/1.0/db/init:
 *   get:
 *     summary: Init db
 *     tags: [db]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Fail
 */
router.post( '/db/init', async(req, res)=>{
    try{
        await dataInitDB()
        res.json({message: 'Success :)'})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Fail :('})
    };
});

module.exports = router;