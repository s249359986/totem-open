const AipBodyAnalysisClient = require("baidu-aip-sdk").bodyanalysis;
const fs = require('fs')
// 设置APPID/AK/SK
const APP_ID = "";
const API_KEY = "";
const SECRET_KEY = "";
// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipBodyAnalysisClient(APP_ID, API_KEY, SECRET_KEY)
const promisefy = require('pify')
const readFile = promisefy(fs.readFile)
/*
options 
{  
  path: '图片路径'
}

*/
function bodySeg(options) {
    return new Promise(function (resolve, reject) {
        readFile(options['path']).then(res=>{
            client.bodySeg(res.toString('base64')).then((result)=> {                
                console.log(JSON.stringify(result))
                resolve({code:0,msg:"成功",data:result})
            }).catch((err)=> {
                // 如果发生网络错误
                console.log(err)
                resolve({code:1,msg:"bodySeg失败",data:err})
            })
        }).catch(err=>{
            resolve({code:1,msg:"readFile失败",data:err})

        })       
    })
  }
  module.exports = bodySeg