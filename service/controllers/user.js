
const varify = require('../serve/varify')

// var deployConfig=config.deploy.test;
/*
 *
 * 验证
 * */
module.exports.varify = function * (next) {


  let result = {code:2,msg:'用户未登录'}
  if (this.cookie) {
     let tempCookie = this.cookie
     if (tempCookie['_tosimpleuserid'] && tempCookie['_tosimpletoken'] && tempCookie['_tosimpletimestamp']) {
       result = yield varify.varifyLocal({cookie:tempCookie})
     } else  {
       if(tempCookie['_djinpassuser'] && tempCookie['_djinpasstkt']) {
         result = yield varify.varifyRemote({cookie:tempCookie,clientCookie:this.clientCookie,userAgent:this.headers['user-agent'],ip:this.ip})
          console.info(result)
         if (parseInt(result.code) == 0) {
           result = yield varify.writeToken.call(this)
         }
         else
         {
           result = yield varify.writeToken.call(this)
         }
       }

     }
  }
  this.body=result

}
/*
 *
 * 登出
 * */
module.exports.logout = function * (next) {
  let result = yield varify.logout.call(this)
  this.body=result
}
