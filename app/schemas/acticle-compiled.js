'use strict';

/**
 * Created by alfredlau on 2016/8/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//文章标题,简介,标签,分类,mete信息,封面,作者,访问量
var ArticleSchema = new Schema({
    author: String,
    title: String,
    desc: String,
    tag: String,
    poster: String,
    pv: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ArticleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

ArticleSchema.statics = {
    fetch: function fetch(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
};

module.exports = exports = ArticleSchema;

//# sourceMappingURL=acticle-compiled.js.map