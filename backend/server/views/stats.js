const router = require('express').Router();

router.use('/', require('../controllers/stats/stats.js'));

module.exports = router;