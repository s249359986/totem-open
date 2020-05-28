var express = require('express');
var router = express.Router();
const config = require('../configs/config');
// const uploadServe = require('../serve/upload');
const compressControl = require('../controllers/compress')
const checkOpenApi = require('../serve/checkOpen');
const gmServe = require('../serve/gmServe');
const dataToPic = require('../serve/dataToPic');
var multer = require('multer')
let limit = { files: 10 }
var upload = multer({ dest: config.storeDirPath, preservePath: true, limit })



/**
 * 
 * base 64转gif。
*/
router.post('/api/open/baseDataToGif', upload.any(), async function (req, res, next) {

  let { time, appKey, privateKey } = req.body
  let checkResult = checkOpenApi(time, appKey, privateKey)
  if (!checkResult['pass']) {
    res.json({ code: 1, msg: checkResult['msg'] });
    return
  }
  let list = []
  try {
    for (let i = 0; i < req['body']['baseData'].length; i++) {      
      let {code,data} = await dataToPic(req['body']['baseData'][i])
      if(code == 0){
        list.push({ delay: 0.5, path: data['path'] })
      }          
    }
    result = await gmServe(list)
    res.json(result)
  } catch (err) {
    console.log("err", err)
    res.json({ code: 1, data: err })
  }



  // let data = []
  // for (let i = 0; i < req['files'].length; i++) {
  //   data.push({ delay: 0.5, path: req['files'][i]['path'] })
  // }
  // let result = null
  // try {
  //   result = await gmServe(data)
  //   // console.log('files', req.files)
  //   console.log('body', req.body)//参数例如name
  //   res.json(result);
  // } catch (err) {
  //   res.json({ code: 1, data: err });
  // }


});




/**
 * 
 * 图片备份
*/
router.post('/api/open/save', upload.any(), async function (req, res, next) {
  let { time, appKey, privateKey } = req.body
  let checkResult = checkOpenApi(time, appKey, privateKey)
  if (!checkResult['pass']) {
    res.json({ code: 1, msg: checkResult['msg'] });
    return
  } else {
    res.json({ code: 0, msg: '成功' });
  }
});


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

/**
 * 
 * 处理 gif 图片
*/
router.post('/api/open/uploadMore', upload.any(), async function (req, res, next) {

  let { time, appKey, privateKey } = req.body
  let checkResult = checkOpenApi(time, appKey, privateKey)
  if (!checkResult['pass']) {
    res.json({ code: 1, msg: checkResult['msg'] });
    return
  }


  let data = []
  for (let i = 0; i < req['files'].length; i++) {
    data.push({ delay: 0.5, path: req['files'][i]['path'] })
  }
  let result = null
  try {
    result = await gmServe(data)
    console.log('files', req.files)
    console.log('body', req.body)//参数例如name
    res.json(result);
  } catch (err) {
    res.json({ code: 1, data: err });
  }


});

module.exports = router;
