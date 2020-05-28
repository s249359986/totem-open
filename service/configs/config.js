/**
 * Created by songdonghong on 2016/11/2.
 */
var config = {
    domain: '', // 域名
    openDomain: '', // 接口域名
    downloadDirPath: 'staticWeb/output', //下载的虚拟路径  //线上
    //storeDirPath:'',     //文件存储的物理路径 //线上
    storeDirPath: '',     //文件存储的物理路径 //本地
    statis: { //请求统计入库配置
        date: { //定时设置
            hour: 12,
            minute: 2,
            second: 0
        },
        dbName: "qfw_sys_test",//数据库
        clazzName: "page_view"
    },
    log: {
        date: {
            hour: 2,
            minute: 30,
            second: 0
        },
        backups: 6,//日志备份数量
        dbName: "qfw_sys_test",
        clazzName: "log",
        appender: [{
            type: 'console'
        },
        {
            type: 'file',
            filename: "appLog/log_file_normal.json",
            maxLogSize: 10 * 1024 * 1024,
            backups: 6,//日志备份数量
            category: "normal"
        }, {
            type: 'file',
            filename: "appLog/log_file_transfer.json",
            maxLogSize: 10 * 1024 * 1024,
            //maxLogSize:500,
            backups: 6,//日志备份数量
            category: "transfer",
            layout: {
                type: 'pattern',
                pattern: "date++%d{ISO8601}===logLevel++%p===logCateGory++%c===info++%m"
            }
        }, {
            type: 'file',
            filename: "appLog/log_file_req.json",
            maxLogSize: 10 * 1024 * 1024,
            backups: 6,//日志备份数量
            category: "req",
            layout: {
                type: 'pattern',
                pattern: "[%d{ISO8601}] [%p] [%c] [%m]"
            }
        }, {
            type: 'file',
            filename: "appLog/log_file_info.json",
            maxLogSize: 10 * 1024 * 1024,
            backups: 6,//日志备份数量
            category: "info",
            layout: {
                type: 'pattern',
                pattern: "[%d{ISO8601}] [%p] [%c] [%m]"
            }
        }]
    },

    whiteList: [], // 可访问域名白名单
    allowOrigin: [],      
    CORS: { origin: true, credentials: true },
    PORT: [8003],
    NODE_ENV: "dev",//production,development
    PRIVATEKEY: "",
    TIMESTAMP: 7200,
    TRANSFERURL: "",
    ERROR: {
        REQERROR: { CODE: 1, MESSAGE: "请求参数错误" },
        NOTFOUNDERROR: { CODE: 404, MESSAGE: "路径不存在" },
        NOLOGINERROR: { CODE: 2, MESSAGE: "未登录用户" }
    }
}

module.exports = config;
