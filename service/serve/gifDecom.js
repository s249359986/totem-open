//图片合成gif
const uuidv4 = require('uuid/v4')
const config = require('../configs/config')
let dir = config['storeDirPath']



const gm = require('gm').subClass({ imageMagick: true })
//   gm("/Users/bill/个人项目/testGm/aaa.png").thumbnail(10,10).write("/Users/bill/个人项目/testGm/aaa11.png",err=>{
//       console.log('err',err)
//   })
// gm().in("/Users/bill/个人项目/testGm/a1.jpg").in("/Users/bill/个人项目/testGm/a2.png").in("/Users/bill/个人项目/testGm/a3.png").mosaic().write("/Users/bill/个人项目/testGm/w1.png",err=>{
//     console.log('err',err)
// })
// gm().in("/Users/bill/个人项目/testGm/a1.jpg","/Users/bill/个人项目/testGm/a2.png","/Users/bill/个人项目/testGm/a3.png").write("/Users/bill/个人项目/testGm/w1.gif",err=>{
//     console.log('err',err)
// })
// gm().in("/Users/bill/个人项目/testGm/w1.gif").write("/Users/bill/个人项目/testGm/test/aa%d.jpg",err=>{
//   console.log('err',err)
// })  //gif反编译成jpg

const _DELAY = "-delay"
const _SPLID = ","
const _BASE = 100
function getFileName() {
  const uuid = uuidv4()
  return "qdzd" + uuid + ".gif"
}
function getFormatDelay(data) {
  if (data) {
    return data * _BASE + ""
  } else {
    return "0"
  }

}
// gm().in("-delay","400","/Users/bill/个人项目/testGm/a1.jpg").in("/Users/bill/个人项目/testGm/a1.jpg").in("-delay","900").in("/Users/bill/个人项目/testGm/a2.png").in("-delay","1400").in("/Users/bill/个人项目/testGm/a3.png").write("/Users/bill/个人项目/testGm/w1.gif",err=>{
//     console.log('err',err)
// }) 
function getFormatStr(data) {
  let tempData = []
  for (let i = 0; i < data.length; i++) {
    tempData.push(_DELAY)
    tempData.push(getFormatDelay(data[i]['delay']))
    tempData.push(data[i]['path'])
  }
  return tempData
}
/*
options []
{
  delay: 现在单位是秒//原api 1%秒,
  path: '图片路径'
}

*/
function gifDecom(options) {
  return new Promise(function (resolve, reject) { //"/Users/bill/个人项目/testGm/test/aa%d.jpg"
    gm().in(options['path']).write(options['outpath'],err=>{
           console.log('err',err)
         }) 
  })
}
module.exports = gifDecom