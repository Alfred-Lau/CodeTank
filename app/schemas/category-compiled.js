'use strict';

/**
 * Created by alfredlau on 2016/8/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    name: String,
    articles: [{ type: ObjectId, ref: 'article' }],
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

CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

CategorySchema.statics = {
    fetch: function fetch(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
};

module.exports = exports = CategorySchema;

//# sourceMappingURL=category-compiled.js.map