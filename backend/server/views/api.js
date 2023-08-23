const router = require('express').Router();

// health check
router.get('/api/1.0', function(req, res){res.send('Hello World!');})

// document
router.use('/api/1.0/docs',  require('./swagger.js'));

// routers
router.use('/api/1.0/data', require('../controllers/data.js'));
router.use('/api/1.0/entries', require('../controllers/entries.js'));
router.use('/api/1.0/registers', require('../controllers/registers.js'));
router.use('/api/1.0/fs', require('../controllers/fs.js'));
router.use('/api/1.0/stats', require('../controllers/stats.js'));
router.use('/api/1.0/goals', require('../controllers/goals.js'));
router.use('/api/1.0/users', require('../controllers/users.js'));


module.exports = router;