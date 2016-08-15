'use strict';

var express = require('express');
var router = express.Router();
var index = require('../app/controllers/index');
var chartanalysis = require('../app/controllers/chartanalysis');
var css3h5 = require('../app/controllers/css3h5');
var blog = require('../app/controllers/blog');
var aboutme = require('../app/controllers/aboutme');
var user = require('../app/controllers/user');

//user

router.post('/user/signup', user.signup);
router.post('/user/signin', user.signin);
router.get('/signin', user.showSignin);
router.get('/signup', user.showSignup);
router.get('/logout', user.logout);

/* GET home page. */
router.get('/', index.index);
router.get('/charts', chartanalysis.index);
router.get('/data', chartanalysis.data);

//c33h5 page

router.get('/css3h5', css3h5.index);

//blog page

//blog-index
router.get('/blog', blog.index);

router.get('/blog/new', user.signInRequired, user.adminRequired, blog.new);

router.post('/blog', user.signInRequired, user.adminRequired, blog.savePoster, blog.save);

//aboutme page


router.get('/aboutme', aboutme.index);

module.exports = router;

//# sourceMappingURL=index-compiled.js.map