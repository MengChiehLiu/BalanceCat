const router = require('express').Router();

// health check
router.get('/', function(req, res){res.send('Hello World!');})

// routers
router.use('/api/1.0/data', require('./data.js'));





// income statement
router.use('/api/1.0/is', require('./incomeStatement.js'));

// goals
router.use('/api/1.0/goals', require('./goals.js'));




module.exports = router;