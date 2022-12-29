var express = require('express');
const { handleRefreshToken } = require('../controller/refreshTokenController');
var router = express.Router();

/* GET users listing. */
router.get('/',handleRefreshToken);

module.exports = router;
