const gifDecom = require('../serve/gifDecom')
const promisefy = require('pify')
const fs = require('fs')
const writeFile = promisefy(fs.writeFile)
gifDecom({ path: "./neza.gif",outpath:"./nz%d.jpg" }).then(res => {

}).catch(err => {
    console.log('bodySegServe:err', err)
})