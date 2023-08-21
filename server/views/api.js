const router = require('express').Router();

// health check
router.get('/', function(req, res){res.send('Hello World!');})

// document
router.use('/api/1.0/docs',  require('./swagger.js'));

// routers
router.use('/api/1.0/data', require('./data.js'));
router.use('/api/1.0/entries', require('./entries.js'));
router.use('/api/1.0/registers', require('./registers.js'));
router.use('/api/1.0/fs', require('./fs.js'));
router.use('/api/1.0/stats', require('./stats.js'));
router.use('/api/1.0/is', require('./incomeStatement.js'));
router.use('/api/1.0/goals', require('./goals.js'));
router.use('/api/1.0/users', require('./users.js'));


module.exports = router;