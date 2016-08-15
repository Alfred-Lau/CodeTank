'use strict';

var _article = require('../models/article');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports; /**
                           * Created by alfredlau on 2016/8/15.
                           */

exports.index = function (req, res, next) {
    _article2.default.find({}).limit(20).exec(function (err, result) {
        if (err) {
            console.log(err);
        }
        // res.json({
        //         title: 'blog',
        //         result: result,
        //     });
        res.render('blog', {
            title: 'blog',
            result: result
        });
    });
};

exports.new = function (req, res, next) {
    res.render('write');
};

exports.savePoster = function (req, res, next) {};

exports.save = function (req, res, next) {};

//# sourceMappingURL=blog-compiled.js.map