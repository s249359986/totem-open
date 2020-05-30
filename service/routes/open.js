var express = require('express');
var router = express.Router();
const config = require('../configs/config');
// const uploadServe = require('../serve/upload');
const compressControl = require('../controllers/compress')
var multer = require('multer')
let limit = { files: 10 }
var upload = multer({ dest: config.storeDirPath, preservePath: true, limit })





/**
 * 
 * 图片压缩接口
*/
router.post('/api/open/upload', upload.any(), async function (req, res, next) {
  let data = null
  console.log('files', req.files)
  console.log('body', req.body)//参数例如name
  for (let i = 0; i < req['files'].length; i++) {
    data = await compressControl.upload(req['files'][i], req.body)
  }
  console.log('compressControl:data', data)
  res.json(data);
});

module.exports = router;
