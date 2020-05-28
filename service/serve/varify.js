const tool = require('../tool/crypto')
const config = require('../configs/config')
const deployConfig=config[process.env['NODE_ENV']||'dev']['inpass'];
const SALT = config['PRIVATEKEY']
const TWOHOUR = config['TIMESTAMP']
// token规范userid+SALT+时间戳
//平台   token:_tosimpletoken
//平台时间戳 _tosimpletimestamp

//inpass     _djinpassuser,   _djinpasstkt
/*
*
* 验证本地服务器
* */
module.exports.varifyLocal=function (option) {
  return new Promise(function(resolve,reject){
    if(option.cookie) {
      let curTime = new Date().getTime()
      let cookie = option.cookie
      let userId = cookie['_tosimpleuserid']
      let tosimpleToken = cookie['_tosimpletoken']
      let timestamp = parseInt(cookie['_tosimpletimestamp'])
        let tempMd5 = tool.MD5(userId + SALT +timestamp)
        if(tempMd5 === tosimpleToken) {
          resolve({code:0,msg:'合法用户'})
        } else {
          resolve({code:3,msg:'非法用户'})
        }
      // }

    } else {
      resolve({code:1,msg:'用户信息不存在'})
    }
  })
}

/*
*
* 校验登录中心
* */
const rp = require('request-promise')
module.exports.varifyRemote=function (option) {
  let options = {
    method:'get',
    uri: deployConfig.uri+"/user/varify",
    qs: {
     // ip:"218.247.7.212"||option.ip,
      ip:option.ip||deployConfig.ip,
      userAgent:option.userAgent,
      systemDomain:deployConfig.systemDomain,
      _djinpassuser:option.cookie['_djinpassuser'],
      _djinpasstkt:option.cookie['_djinpasstkt']
    },
    json: true // Automatically parses the JSON string in the response
  };
console.info(options)
  return rp(options)
    .then(function (parsedBody) {
      // POST succeeded...
      console.info(parsedBody)
      if (parseInt(parsedBody['code']) == 0) {
        return Promise.resolve({code:0,msg:"成功",data:parsedBody})
       // return Promise.resolve({code:0,msg:"成功"})
      } else
      {
        return Promise.resolve({code:1,msg:"失败",data:parsedBody})
      }

    })
    .catch(function (err) {
      return Promise.resolve({code:1,msg:"失败catch",data:err})
    });
}
/*
*
* 写入本地cookie
*
* */
const cookieOption = {
  domain:process.env['NODE_ENV']=='production'? '':'',
  httpOnly:false,
  maxAge:1000*3600*24*2
}
module.exports.writeToken=function (option) {
  console.log('writeToken')
  const curTime = new Date().getTime()
  let userId = this.cookies.get('_djinpassuser')
  this.cookies.set('_tosimpleuserid', userId,cookieOption)
  this.cookies.set('_tosimpletimestamp', curTime,cookieOption)
  let tempMd5 = tool.MD5(userId + SALT +curTime)
  this.cookies.set('_tosimpletoken', tempMd5,cookieOption)
  return Promise.resolve({code:0,msg:"成功"})
}
/*
*
* 登出
*
* */

module.exports.logout=function (option) {
  this.cookies.set("_tosimpleuserid","",{expires:new Date(0)})
  this.cookies.set("_tosimpletoken","",{expires:new Date(0)})
  this.cookies.set("_tosimpletimestamp","",{expires:new Date(0)})
  return Promise.resolve({code:0,msg:"成功"})

}
