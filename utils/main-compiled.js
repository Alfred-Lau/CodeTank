'use strict';

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cio = require('cheerio');
var request = require('request');
var url = require('url');
var util = require('util');

var option = _config2.default.mysql;

var pool = _mysql2.default.createPool(option);

var webPrefix = 'http://bj.lianjia.com/zufang/';

// 1.抓取首页，判断多少套房，进而判断多少页，作为循环参数

var destId = [];

function getContents(id) {
    var dstUrl = url.resolve(webPrefix, id) + ".html";
    request(dstUrl, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var $ = cio.load(body);

            var _id = id;
            // 所在区域
            var region = $('div.zf-room p').eq(6).find('a').text();
            // 租金
            var rent = $('div.content.zf-content span.total').text();
            // 面积
            var area = $('div.zf-room p').eq(0).text();
            // 房型
            var type = $('div.zf-room p').eq(1).text();
            // 楼层
            var floor = $('div.zf-room p').eq(2).text();
            // 房屋朝向
            var dir = $('div.zf-room p').eq(3).text();
            // 地铁情况
            var subway = $('div.zf-room p').eq(4).text();
            // 房源特色
            var special = $('div.featureContent span').text();
            // 其他（更新时间，多少人看过此房，同小区成交记录，特殊标示（自如））
            var others = '';
            var source = {
                id: _id,
                region: region,
                rent: rent,
                area: area,
                type: type,
                floor: floor,
                dir: dir,
                subway: subway,
                special: special,
                others: others
            };
            // console.log(util.inspect(source));
            // 存入Mysql数据库
            pool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                }
                connection.query('insert into housedata set ?', source, function (err, rows, field) {
                    if (err) throw err;
                    connection.query('select * from housedata limit 10', function (err, results) {
                        if (err) {
                            console.log('查询失败');
                        } else {
                            console.log(util.inspect(results));
                        }
                    });
                    connection.release();
                });
            });
        } else {
            console.log(err);
        }
    });
}

function cb(listUrl) {
    request(listUrl, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            (function () {
                var $ = cio.load(body);
                $("ul#house-lst li").each(function (index, elem) {
                    //和jquery转换为dom的语法完全一致
                    var id = $(elem).attr('data-id');
                    return getContents(id);
                });
            })();
        } else {
            console.log(err);
        }
    });
}

function getUrlAsyn(listUrl) {
    return cb(listUrl);
}

request.get(webPrefix, function (err, res, body) {
    if (!err && res.statusCode == 200) {
        var pageNumString;
        var pageNum;
        var i;
        var listUrl;

        (function () {
            var $ = cio.load(body);
            // 判断多少页
            pageNumString = $('div.page-box.house-lst-page-box').attr('page-data');
            pageNum = parseInt(JSON.parse(pageNumString).totalPage, 10);


            for (i = 1; i < pageNum + 1; i++) {
                if (i == 1) {
                    $("ul#house-lst li").each(function (index, elem) {
                        //和jquery转换为dom的语法完全一致
                        var id = $(elem).attr('data-id');
                        getContents(id);
                    });
                } else {
                    listUrl = webPrefix + 'pg' + i.toString() + '/';

                    getUrlAsyn(listUrl);
                }
            }
        })();
    } else {
        return;
    }
});
// 2.拼接url，得到页面上面的url的a链接，持久化，为第三步访问具体页面做好准备

// 3.访问具体房源页面，分析抓取相关信息，再次拼接，做好持久化，完成任务

//# sourceMappingURL=main-compiled.js.map