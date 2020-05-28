/**
 * Created by songdonghong on 2017/3/29.
 */
'use strict';
const varify = require('../serve/varify')


/**
 * 统计 middleware
 *
 * @param {Object} [options]
 * @return {GeneratorFunction}
 * @api public
 */

module.exports.varify = function getMiddleware(options) {

  return function* (next) {

    let result = {code:2,msg:'用户未登录'}
    if (this.cookie) {
      let tempCookie = this.cookie
      if (tempCookie['_tosimpleuserid'] && tempCookie['_tosimpletoken'] && tempCookie['_tosimpletimestamp']) {
        result = yield varify.varifyLocal({cookie:tempCookie})
        if (result.code == 0) {
          yield next
        } else {
          this.body=result
        }
      } else  {
        if(tempCookie['_djinpassuser'] && tempCookie['_djinpasstkt']) {
          result = yield varify.varifyRemote({cookie:tempCookie,clientCookie:this.clientCookie,userAgent:this.headers['user-agent'],ip:this.ip})
          if (result.code == 0) {
            yield next
          } else {
            this.body=result
          }
        }
      }
    } else {
      this.body=result
    }
  }
}
