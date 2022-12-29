var express = require('express');
var router = express.Router();
const { logoutauth } = require('../controller/logoutController');

/* GET users listing. */
router.get('/',logoutauth);

module.exports = router;
