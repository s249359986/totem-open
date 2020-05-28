/**
 * Created by songdonghong on 2017/3/28.
 */

var tool = require('../tool/crypto');
function Code() {
    this.fields=[];
}
Code.prototype.setFields=function (fields) {
    this.fields=fields;
}
Code.prototype._isCode=function (value) {
    if(Object.prototype.toString.call(value)==='[object Object]')
    {
     return true;
    }
    else
    {
        return false;
    }
}
Code.prototype._toCode=function (value) {
    var tempValue=value;//JSON.parse(value);
    if(!tempValue["__code"])
    {
        return tempValue["value"];
    }
    else if(tempValue["__code"]=="base64")
    {
        return tool.Base64(tempValue["value"]);
    }
    else if(tempValue["__code"]=="md5")
    {
       return tool.MD5(tempValue["value"]);
    }
}
Code.prototype.init=function () {
 this._check();
}
Code.prototype._check=function () {
    var tempFields=this.fields;
    var _this=this;
    for(var i in tempFields)
    {
        if(_this._isCode(tempFields[i]))
        {
            tempFields[i]=_this._toCode(tempFields[i]);
        }
    }
    this.fields=tempFields;
}
Code.prototype.getCodeRuselt=function () {
    return this.fields;
}
module.exports=Code;