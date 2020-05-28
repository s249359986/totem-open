/**
 * Created by songdonghong on 2016/11/10.
 */
var util = require('util');
var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error'
};
util.inherits(AbstractError, Error);
module.exports.util=util;
module.exports.AbstractError=AbstractError;