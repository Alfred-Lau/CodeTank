"use strict";
import mongoose from 'mongoose'

import options from '../../config/config'

const db = mongoose.createConnection(options.mongodb.host, options.mongodb.db);

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
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
