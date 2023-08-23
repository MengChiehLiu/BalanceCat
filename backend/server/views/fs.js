const router = require('express').Router();

router.use('/', require('../controllers/fs.js'));

module.exports = router;