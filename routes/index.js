var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');
var chartanalysis = require('../app/controllers/chartanalysis');
var css3h5 = require('../app/controllers/css3h5');
var blog = require('../app/controllers/blog');
var aboutme = require('../app/controllers/aboutme');


//user

/* GET home page. */
router.get('/', index.index);
router.get('/charts', chartanalysis.index);
router.get('/data', chartanalysis.data);


//c33h5 page

router.get('/css3h5', css3h5.index);

//blog page

//blog-index
router.get('/blog', blog.index);

//aboutme page


router.get('/aboutme', aboutme.index);

module.exports = router;
