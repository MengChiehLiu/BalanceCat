const router = require('express').Router();

router.use('/', require('../controllers/data/initDB.js'));

module.exports = router;