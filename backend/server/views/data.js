const router = require('express').Router();

router.use('/', require('../controllers/initDB.js'));

module.exports = router;