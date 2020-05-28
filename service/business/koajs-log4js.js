/**
 * Created by songdonghong on 2017/3/17.
 */
var log4js = require('log4js');
var util = require('util');
var date = require('../tool/date_format.js');

// date, addr, method, url, HTTP/version, content-length, user-agent
var DEFAULT = "%s %s -- %s %s HTTP/%s, %s %s";
/*
 * middleware
 */

//exports=module.exports=log4js;

function KoaLog4js(name) {
    this._name=name||"normal";
    this._log4js=log4js;
    this._logger={};
}
KoaLog4js.prototype.getLogger=function (name) {

    this._logger=this._log4js.getLogger(name||this._name);
    this.proxy();
    return this._logger;
}
KoaLog4js.prototype.proxy=function (appenders) {

    this._logger["koaLogger"]=this.koaLogger.bind(this);
}
KoaLog4js.prototype.setAppender=function (appenders) {
    this._log4js.configure({
        appenders: appenders,
        replaceConsole: true
    });

}
KoaLog4js.prototype.addAppender=function (appenders) {

}
KoaLog4js.prototype.koaLogger=function () {
    var _this=this;
    return function* (next){
        var req = this.request, header = req.header, nodeReq = this.req;
        var str = util.format(DEFAULT, date.asString(new Date), req.ip, req.method, req.url, nodeReq.httpVersion, req.length || null, header['user-agent']);
       _this._logger.info(str);

        yield next;
    }
}

module.exports=KoaLog4js;



// where to get status, referer
// add more info
// 解析配置选项, 创建file logger, 支持log 内容配置
// 从其他middleware中可以获取到 logger
// 日志格式可参看 log4js的 connetct-logger
