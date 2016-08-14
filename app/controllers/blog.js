/**
 * Created by alfredlau on 2016/8/15.
 */


module.exports = exports;

exports.index = (req, res, next)=> {
    res.render('blog', {contents: 'hello,blog'});


};