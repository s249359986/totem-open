/**
 * Created by songdonghong on 2017/3/17.
 */
var config=require('../configs/config');
var Log4js= require('./koajs-log4js');
var log4js=new Log4js();
log4js.setAppender(config.log.appender);
//var logger=log4js.getLogger("normal");
module.exports=log4js;

