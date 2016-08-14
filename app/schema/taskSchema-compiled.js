"use strict";

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose2.default.createConnection(_config2.default.mongodb.host, _config2.default.mongodb.db);

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    //一次打开记录
    console.log('obj');
});

// let mongoose = require('mongoose');
// let option = require('../../config/config');

// const db = mongoose.createConnection(option.host, option.db);

// db.on('error', console.error.bind(console, '连接错误:'));
// db.once('open', function() {
//     //一次打开记录
//     console.log('obj');


// });

//# sourceMappingURL=taskSchema-compiled.js.map