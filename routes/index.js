var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');
var chartanalysis = require('../app/controllers/chartanalysis');

/* GET home page. */
router.get('/', index.index);
router.get('/chart-anylysis', chartanalysis.index);
router.get('/data', chartanalysis.data);

module.exports = router;
