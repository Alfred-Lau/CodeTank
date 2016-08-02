const cio = require('cheerio');
const request = require('request');
const url = require('url');
const util = require('util');


const webPrefix = 'http://bj.lianjia.com/zufang/';


// 1.抓取首页，判断多少套房，进而判断多少页，作为循环参数

var destId = [];

function getContents(id) {
    var dstUrl = url.resolve(webPrefix, id) + ".html";

    console.log(dstUrl);
    request(dstUrl, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            var $ = cio.load(body);

            var _id = id;
            // 所在区域
            var region = $('div.zf-room p').eq(6).find('a').text();
            // 租金
            var rent = ' ';
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
            var special = '';
            // 其他（更新时间，多少人看过此房，同小区成交记录，特殊标示（自如））
            var others = '';
            var source = {
                id: _id,
                region: region,
                area: area,
                type: type,
                floor: floor,
                dir: dir,
                subway: subway
            };

            console.log(util.inspect(source));
        } else {
            console.log(err);
        }
    });
}

request.get(webPrefix, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        $ = cio.load(body);
        $("ul#house-lst li").each((index, elem) => {
            //和jquery转换为dom的语法完全一致
            var id = $(elem).attr('data-id');
            getContents(id);

            // destId.push();
        });

    } else {
        return;
    }
});
// 2.拼接url，得到页面上面的url的a链接，持久化，为第三步访问具体页面做好准备

// 3.访问具体房源页面，分析抓取相关信息，再次拼接，做好持久化，完成任务