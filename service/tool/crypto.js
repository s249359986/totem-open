/**
 * Created by songdonghong on 2016/11/2.
 */
var CryptoJS = require("crypto-js");



// Encrypt
// var ciphertext = CryptoJS.AES.encrypt('my message', 'song');
// Decrypt
// console.log("sss:"+ciphertext.toString());
//  var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'song');
var Obj={
    Decrypt:function (code,pwd) {
        code=code.replace(/\s/g,"");
        var bytes  = CryptoJS.AES.decrypt(code, pwd);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log("明文："+plaintext);
        return plaintext;
    },
    Encrypt:function (text,pwd) {
        console.log(text);
        console.log(pwd);
        var tempCode=CryptoJS.AES.encrypt(text,pwd);
        console.log(tempCode.toString());
        return tempCode.toString();
    },
    MD5:function (text,pwd) {//32位小写
        console.log("MD5:"+text);
        var tempText=CryptoJS.MD5(text).toString();
        return  tempText;
    },
    Base64:function (text) {
        var b = new Buffer(text);
        return b.toString('base64');
    }
};





module.exports=Obj;