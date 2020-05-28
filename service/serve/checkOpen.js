'use strict';
const apps = [{
    appKey: "gfnine",
    appSecret: "gfninesecret"
}]

function getAppSecret(appKey) {
    for (let i = 0; i < apps.length; i++) {
        if (apps[i]['appKey'] == appKey) {
            return apps[i]['appSecret']
        }
    }
}

const crypto = require('../tool/crypto');
const salt = 'totem-gif-serve-20200211'
module.exports = function (time, appKey, privateKey) {
    if (!time || !appKey || !privateKey) {
        return { pass: false, msg: "参数缺失time|appKey|privateKey" }
    }
    let curTime = new Date().getTime()
    let maxTime = curTime + 5 * 1000
    if (time > maxTime) {
        return { pass: false, msg: "请求失效" }
    }
    let flag = false
    for (let i = 0; i < apps.length; i++) {
        if (appKey == apps[i]['appKey']) {
            flag = true
            break;
        }
    }
    if (!flag) {
        return { pass: false, msg: "非法应用" }
    }
    let tempPrivateKey = crypto.MD5(time + appKey + getAppSecret(appKey))
    if (tempPrivateKey != privateKey) {
        return { pass: false, msg: "签名错误" }
    }
    return { pass: true, msg: "成功" }

};