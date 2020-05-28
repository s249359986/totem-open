
const config = require('../configs/config');
const uploadServer = require('../serve/upload');
const compressServer = require('../serve/compress');
/*
 *
 * 查询
 * */
module.exports.upload = async function (next) {
    let tempFile = this.request.files[0]
    let params = this.request.fields
    let uploadServerObj = await uploadServer(tempFile)
    let compressServerObj
    if (uploadServerObj.code == 0) {
    }
    else {
        this.body = uploadServerObj
    }

}
