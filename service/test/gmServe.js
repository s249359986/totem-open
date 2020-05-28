const gmServe = require('../serve/gmServe')
const promisefy = require('pify')
const fs = require('fs')
const writeFile = promisefy(fs.writeFile)
let tempPath = [
    {path:"./nz0.jpg",delay:0.4},
    // {path:"./nz1.jpg",delay:0.3},
    // {path:"./nz2.jpg",delay:0.3},
    // {path:"./nz4.jpg",delay:0.3},
    // {path:"./nz5.jpg",delay:0.3},
    // {path:"./nz7.jpg",delay:0.3},
    {path:"./nz8.jpg",delay:0.4},
    // {path:"./nz10.jpg",delay:0.3},
    // {path:"./nz11.jpg",delay:0.3},
    // {path:"./nz13.jpg",delay:0.3},
    // {path:"./nz14.jpg",delay:0.3},
    // {path:"./nz16.jpg",delay:0.3},
    {path:"./nz17.jpg",delay:0.4},
    // {path:"./nz19.jpg",delay:0.3},
    // {path:"./nz20.jpg",delay:0.3},
    // {path:"./nz22.jpg",delay:0.3},
    // {path:"./nz23.jpg",delay:0.3},
    // {path:"./nz25.jpg",delay:0.3},
    {path:"./nz26.jpg",delay:0.4},
    // {path:"./nz28.jpg",delay:0.3},
    // {path:"./nz29.jpg",delay:0.3},
    // {path:"./nz31.jpg",delay:0.3},
    // {path:"./nz32.jpg",delay:0.3},
    // {path:"./nz34.jpg",delay:0.3},
    {path:"./nz35.jpg",delay:0.4},
    // {path:"./nz37.jpg",delay:0.3},
    // {path:"./nz38.jpg",delay:0.3},
    // {path:"./nz40.jpg",delay:0.3},
    // {path:"./nz41.jpg",delay:0.3},
    {path:"./nz42.jpg",delay:0.4}
]
gmServe(tempPath).then(res => {

}).catch(err => {
    console.log('bodySegServe:err', err)
})