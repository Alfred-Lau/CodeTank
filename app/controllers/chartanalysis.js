import util from 'util';
import mysql from 'mysql';
import option from '../../config/config';

let pool = mysql.createPool(option.mysql);

exports.index = function (req, res, next) {
    res.render('chart-index', {title: 'Code Tank'});
}

exports.data = function (req, res, next) {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query('select region, rent, area from housedata limit 50', (err, results) => {
        if (err)
        throw err;
    for (let single of results) {
        ;
    }
    res.json(JSON.stringify(results));
})
    connection.release();
})
}
