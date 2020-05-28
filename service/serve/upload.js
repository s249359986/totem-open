
/**
 * 
 * 将上传的临时文件夹一层目录
 * 
*/

const config = require('../configs/config')
const uuidv4 = require('uuid/v4')
var fs = require('fs');
const path = require('path');
let dir=config['storeDirPath']
module.exports=function (file) {
    let pix='.';
    let split='_';
    let fgf = '/'

    let tempFile=file.path;
    let fileName=file.name || file.originalname; //文件名
    let fileSize=file.size; //文件尺寸
    let fileType=file.type || file.mimetype; //文件类型
    let tempFileNameObj=fileName.split(pix);
    let fileRealName=tempFileNameObj[0]; //文件真实姓名不带后缀
    let fileRealExt=tempFileNameObj[1];  //文件后缀，类型
    let tempUuid = uuidv4()    
    return new Promise(function(resolve,reject){
        let newDir = dir+fgf+tempUuid
        let newFile=newDir+fgf+fileName; //新文件的地址
        /* 本地可用
        fs.rename(tempFile,newStr, function(err){
            if(err)
            {
                resolve({code:1,msg:"失败",data:err})
            }
            else
            {
                resolve({code:0,msg:"成功",data:{fileName:tempName,fileSize:fileSize}});
            }

        });
        */
      var readStream=fs.createReadStream(tempFile);
      console.log('readStream')
      fs.mkdir(newDir, { recursive: true }, (err) => {
        if (err){
            console.log('fs.mkdir',err)
            resolve({code:1,msg:"创建目录失败",data:err});
        }else{
            var writeStream=fs.createWriteStream(newFile);
               console.log('readStream')
               readStream.pipe(writeStream);
               readStream.on('error',function(error){
                console.log('上传失败',error)
                resolve({code:1,msg:"失败",data:error});
               });
               readStream.on('end',function(){
                 console.log('上传成功')
                 resolve({code:0,msg:"成功",data:{folder: tempUuid,fileName:fileName,fileSize:fileSize}});
                });
        }
      })
    });
};
