/**
 * Created by alfredlau on 2016/8/15.
 */

var mongoose = require('mongoose')
var UserSchema = require('../schemas/user')
var User = mongoose.model('User', UserSchema)

module.exports = exports = User