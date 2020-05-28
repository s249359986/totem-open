const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const fs = require('fs');
const pify = require('pify');
let fsP = pify(fs);
const config = require('../configs/config')
const uuidv4 = require('uuid/v4')
let outputDir = config['storeDirPath']//path.resolve(__dirname,'../sources/compress/');
let inputDir = config['storeDirPath'] //path.resolve(__dirname,'../sources/upload');
function readFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
let QUALITY = {
  low: '0-20',
  medium: '21-40',
  high: '41-60',
  veryhigh: '61-80'
}
module.exports = function (option) {
  let folder = option.folder;
  let inputFile = inputDir + '/' + folder + '/' + option.name;
  let quality = option.quality || 'veryhigh';
  const uuid = uuidv4()
  const outputDirNew = outputDir + '/' + uuid
  let outputFile = outputDirNew + '/' + option.name;
  //low, medium, high and veryhigh
  console.log('开始压缩图片')

  return new Promise(function (resolve, reject) {

    fs.mkdir(outputDirNew, { recursive: true }, async (err) => {
      if (err) {
        console.log('fs.mkdir', err)
        resolve({ code: 1, msg: "创建目录失败", data: err });
      } else {
        if (option.name.indexOf('.png') > -1) {
          try {
            console.log("压缩pngstart")
            const buf = await fsP.readFile(inputFile)
            console.log("压缩png")
            let res = await imagemin.buffer(buf, {
              destination: outputDirNew,
              plugins: [
                imageminPngquant({ quality: QUALITY[quality] })
              ]
            })
            await fsP.writeFile(outputFile, res)
            let data = await fsP.readFile(outputFile)
            data['folder'] = uuid
            resolve({ code: 0, msg: "成功", data: data })
          } catch (error) {
            console.log("压缩失败异常", error)
            resolve({ code: 1, msg: "失败", data: error })
          }
        } else {
          try {
            console.log("压缩jpgstart")
            const buf = await fsP.readFile(inputFile)
            console.log("压缩jpg")
            let res = await imagemin.buffer(buf, {
              destination: outputDirNew,
              plugins: [
                imageminJpegRecompress({ quality: quality })
              ]
            })
            await fsP.writeFile(outputFile, res)
            let data = await fsP.readFile(outputFile)
            console.log('读取的data', data)
            data['folder'] = uuid
            resolve({ code: 0, msg: "成功", data: data })
          } catch (error) {
            console.log("压缩失败异常", error)
            resolve({ code: 1, msg: "失败", data: error })
          }
        }
      }
    })


  })







}
