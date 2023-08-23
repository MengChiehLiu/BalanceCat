const router = require('express').Router();

// import middlewares
const {checkAuthorization} = require('../utils/checkRequest');

// import models
const {getStatsCharts} = require('../models/stats');


async function routerGetOverall(req, res){
    try{
        const user_id = req.user.id;
        const statCodes = [1000, 2000]
        const chartCodes = [1100, 1200, 2100, 2200]

        const [stats, charts] = await getStatsCharts(user_id, statCodes, chartCodes)
        return res.json({data: {stats: stats, charts: charts}})
    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};


async function routerGetExpenses(req, res){
    try{
        const user_id = req.user.id;
        const statCodes = [5100, 5200]
        const chartCodes = [ 
            5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 
            5201, 5202, 5203, 5204, 5205, 5206, 5207, 5208 
        ]

        const [stats, charts] = await getStatsCharts(user_id, statCodes, chartCodes)
        return res.json({data: {stats: stats, charts: charts}})
    }catch(err){
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    };
};

// router
router.get( '/overall', checkAuthorization, routerGetOverall);
router.get( '/expenses', checkAuthorization, routerGetExpenses);
module.exports = router;