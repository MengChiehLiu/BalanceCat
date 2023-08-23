const router = require('express').Router();

router.get('/', require('../controllers/is.js'));


module.exports = router;