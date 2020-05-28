const promisefy = require('pify')
const uuidv4 = require('uuid/v4')
const config = require('../configs/config')
let dir = config['storeDirPath']
const fs = require('fs')
const writeFile = promisefy(fs.writeFile)
function getFileName() {
  const uuid = uuidv4()
  return "/dhc" + uuid //待合成路径
}
/*
options: 文件数据
decode 编码类型

return {
  code:0,
  msg:"原因",
  data:{
    path:"文件路径"
  } 
}
*/
function dataToPic(data, decode) {
  return new Promise(function (resolve, reject) {
    let path = dir + getFileName()
    console.log('dataToPic')
    let decodeImg = Buffer.from(data, 'base64')
    writeFile(path, decodeImg, 'base64').then((data => {
      console.log('dataToPic:suc', data)
      resolve({ code: 0, msg: "成功", data: { path: path } })
    })).catch(err => {
      resolve({ code: 1, msg: "失败", data: err })
    })
  })
}
module.exports = dataToPic