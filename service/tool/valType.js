/**
 * Created by songdonghong on 2017/3/8.
 */
var Obj={
    getObjectkey:function (obj) {//获得对象的属性
        return Object.keys(obj)[0];
    },
    isArray:function (value) {
        return Object.prototype.toString.call(value)==='[object Array]';
    },
    isObject:function (value) {
        return Object.prototype.toString.call(value)==='[object Object]';
    },
    isNumber:function (value) {
        return Object.prototype.toString.call(value)==='[object Number]';
    },
    isString:function (value) {
        return Object.prototype.toString.call(value)==='[object String]';
    },
    isBoolean:function (value) {
        return Object.prototype.toString.call(value)==='[object Boolean]';
    },
    isCustomProto:function (value) {//检测传入是否为protobuf自定义的类

        return Obj.isObject(value);
    },
    hasCustomProto:function (value) {//检测值是否有自定义类
        var tempValue=value;
        for(var i in tempValue)
        {
            if(Obj.isCustomProto(tempValue[i]))
            {
                return true;
            }
        }
        return false;
    },
    getCustomProto:function (value) {//获得自定义类
        var arr=[];
        for(var i in value)
        {
            if(Obj.hasCustomProto(value[i]))
            {
                for(var j in value[i])
                {
                    if(Obj.isCustomProto(value[i][j]))
                    {
                        var obj={};//[0]={ext:""}
                        obj[j]=value[i][j];
                        arr.push(obj);
                    }
                }
            }
        }
        return arr;
    },
    isOriginAllowed:function(origin, allowedOrigin) {//判断跨域来源是否被允许
    if (Array.isArray(allowedOrigin)) {
        for (var i = 0; i < allowedOrigin.length; ++i) {
            if (Obj.isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (Obj.isString(allowedOrigin)) {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}

};
module.exports=Obj;
