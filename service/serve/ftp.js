var Client = require( 'ftp' );
const path = require('path');
const config = require('../configs/config');
const deployConfig=config[process.env['NODE_ENV']||'dev']['ftp'];
let outputDir=path.resolve(__dirname,'../sources/compress/');
module.exports=function (option) {
    return new Promise(function(resolve,reject){
        var c = new Client();
        c.on('ready', function() {
            //let file=path.resolve(__dirname,'../sources/test.js')
            let file=outputDir+"/"+option.name;
            c.put(file, deployConfig.path+option.name, function(err) {
                if (err)
                {
                    console.log('ftp失败')
                    console.error(err)
                    resolve( {code:1,msg:'同步ftp失败',data: err})
                }
                else
                {
                    console.log('ftp成功')                    
                    resolve({code:0,msg:'成功'})
                }
                c.end();
            });
        });
        c.on('error', function(error) {
            if(error){
                resolve( {code:1,msg:'ftp连接异常',data: error}) 
            }else{
                resolve( {code:1,msg:'ftp未知异常',data: error}) 
            }                      
        });
        c.connect({
            host: deployConfig.host,
            port: deployConfig.port,
            user: deployConfig.user,
            password: deployConfig.password
        });


    });
};
