import util from 'util';
import mysql from 'mysql';
import option from '../../config/config';

let pool = mysql.createPool(option.mysql);

exports.index = function(req, res, next) {
    res.render('chart-index', { title: '萍聚' });
}

exports.data = function(req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query('select region, rent from housedata limit 10', (err, results) => {
            if (err)
                throw err;
            res.json(JSON.stringify(results));
        })
        connection.release();
    })
}
