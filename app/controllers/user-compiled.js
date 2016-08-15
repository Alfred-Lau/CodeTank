'use strict';

/**
 * Created by alfredlau on 2016/8/15.
 */

module.exports = exports;

exports.signInRequired = function (req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }

    next();
};

exports.adminRequired = function (req, res, next) {
    var user = req.session.user;
    if (user.role <= 10) {
        return res.redirect('/signin');
    }

    next();
};

exports.showSignin = function (req, res, next) {
    res.render('signin');
};

exports.showSignup = function (req, res, next) {};

exports.signin = function (req, res, next) {};

exports.signup = function (req, res, next) {};

exports.logout = function (req, res, next) {};

//# sourceMappingURL=user-compiled.js.map