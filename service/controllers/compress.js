
const config = require('../configs/config');
const uploadServer = require('../serve/upload');
const compressServer = require('../serve/compress');
/*
 *
 * 查询
 * */
module.exports.upload = async function (file,params) {
    let tempFile = file
    // let params = this.request.fields
    let uploadServerObj = await uploadServer(tempFile)
    let compressServerObj
    if (uploadServerObj.code == 0) {
        let len = params['count'] > 5 ? 5:params['count']
        for(let i=0;i< len;i++){            
            if(i==0){
                compressServerObj = await compressServer({ name: uploadServerObj['data']['fileName'], quality: params['quality'], folder: uploadServerObj['data']['folder'] })
            }else{
                compressServerObj = await compressServer({ name: uploadServerObj['data']['fileName'], quality: params['quality'], folder: compressServerObj['data']['folder'] })
            }
            console.log('count',i)
        }        
        if (compressServerObj.code == 0) {
            console.log('图片压缩成功')
            uploadServerObj['data']['input'] = {}
            uploadServerObj['data']['output'] = {}            
            uploadServerObj['data']['folder'] = compressServerObj['data']['folder'] //压缩后存储的目录
            uploadServerObj['data']['input']['size'] = uploadServerObj['data']['fileSize']
            uploadServerObj['data']['output']['size'] = compressServerObj['data']['length']
            uploadServerObj['data']['output']['url'] = config['domain']+ '/' + config['downloadDirPath'] + '/' + compressServerObj['data']['folder'] + '/' + uploadServerObj['data']['fileName']
            return uploadServerObj
        } else {
            console.log('图片压缩失败')
            return { code: 1, msg: '图片压缩失败',data:uploadServerObj['data']}
        }
    }
    else {
        return uploadServerObj
    }
}
