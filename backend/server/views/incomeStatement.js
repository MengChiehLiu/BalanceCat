const router = require('express').Router();

router.get('/', require('../controllers/is/incomeStatement.js'));


module.exports = router;