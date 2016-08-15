/**
 * Created by alfredlau on 2016/8/15.
 */

import Article from '../models/article';


module.exports = exports;

exports.index = (req, res, next)=> {
    Article.find({})
        .limit(20)
        .exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            // res.json({
            //         title: 'blog',
            //         result: result,
            //     });
            res.render('blog', {
                title: 'blog',
                result: result,
            });
        });
};

exports.new = function (req, res, next) {
    res.render('write');
}

exports.savePoster = function (req, res, next) {

}

exports.save = function (req, res, next) {

}