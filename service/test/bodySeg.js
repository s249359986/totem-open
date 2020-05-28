const bodySegServe = require('../serve/bodySeg')
const promisefy = require('pify')
const fs = require('fs')
const writeFile = promisefy(fs.writeFile)
bodySegServe({ path: "./xc3.jpg" }).then(res => {
    console.log('result', res)
    let {code,data} = res
    if(code == 0){
        writeFile('./err.png', data.foreground,'base64').then((data => {
            console.log('writeFile:suc', data)
        })).catch(err => {
            console.log('writeFile:err', err)
        })
    }else{
        console.log('writeFile:code', data)
    }
}).catch(err => {
    console.log('bodySegServe:err', err)
})