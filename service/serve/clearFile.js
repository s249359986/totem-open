const path = require('path');
const fs = require('fs');
let outputDir=path.resolve(__dirname,'../sources/compress/');
let inputDir=path.resolve(__dirname,'../sources/upload/');
function existsFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.exists(fileName, function (err, data) {
      if (err) {
        resolve(err);
      } else {
        resolve(data);
      }
    });
  });
}
function removeFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.unlink(fileName, function (err, data) {
      if (err) {
        console.log('清除图片失败')
        resolve(err);
      } else {
        console.log('清除图片成功')
        resolve(data);
      }
    });
  });
}
module.exports=function (option) {
  let compressFile=outputDir+'/'+option.name;
  let uploadFile=inputDir+'/'+option.name;
     existsFile(compressFile).then(data =>{
      if(data) {
        removeFile(compressFile)
      }
    })
  existsFile(uploadFile).then(data =>{
    if(data) {
      removeFile(uploadFile)
    }
  })

}
