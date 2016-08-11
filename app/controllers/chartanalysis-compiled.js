'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _mysql2.default.createPool(_config2.default.mysql);

exports.index = function (req, res, next) {
    res.render('chart-index', { title: '萍聚' });
};

exports.data = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }
        connection.query('select region, rent, area from housedata limit 50', function (err, results) {
            if (err) throw err;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var single = _step.value;

                    ;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            res.json(JSON.stringify(results));
        });
        connection.release();
    });
};

//# sourceMappingURL=chartanalysis-compiled.js.map