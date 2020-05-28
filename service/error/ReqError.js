/**
 * Created by songdonghong on 2016/11/10.
 */
var CONFIG=require('../configs/config');
var errorUtil = require('./AbstractError');
var util=errorUtil.util;
var AbstractError = errorUtil.AbstractError;





/*
* 
* 请求错误
* */

var ReqError = function (msg) {
    msg=msg||this.message;
    ReqError.super_.call(this, msg, this.constructor)
};
ReqError.prototype.message = CONFIG.ERROR.REQERROR.MESSAGE;
ReqError.prototype.name = 'req';
ReqError.prototype.code = CONFIG.ERROR.REQERROR.CODE;
util.inherits(ReqError, AbstractError);

/*
 * 
 * 路径错误，没有找到，访问的接口不存在
 * */
var NotFoundError = function (msg) {
    msg=msg||this.message;
    NotFoundError.super_.call(this, msg, this.constructor)
};
NotFoundError.prototype.message = CONFIG.ERROR.NOTFOUNDERROR.MESSAGE;
NotFoundError.prototype.name = 'not found';
NotFoundError.prototype.code = CONFIG.ERROR.NOTFOUNDERROR.CODE;
util.inherits(NotFoundError, AbstractError);

/*
 *
 * 缺少登录信息
 * */

var NoLoginError = function (msg) {
    msg=msg||this.message;
    NoLoginError.super_.call(this, msg, this.constructor)
};
NoLoginError.prototype.message = CONFIG.ERROR.NOLOGINERROR.MESSAGE;
NoLoginError.prototype.name = 'no login';
NoLoginError.prototype.code = CONFIG.ERROR.NOLOGINERROR.CODE;
util.inherits(NoLoginError, AbstractError);




module.exports.NotFoundError=NotFoundError;
module.exports.ReqError=ReqError;
module.exports.NoLoginError=NoLoginError;