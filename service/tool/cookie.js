'use strict';



module.exports = function getMiddleware(options) {
    options = options || {};
    var defaults = {
        type: "json"//string
    };
    // Set defaults
    return function* (next) {
        var context=this;
        const cookieHeader = context.headers.cookie;
        if (cookieHeader) {
            context['clientCookie']=cookieHeader
            const cookies = cookieHeader.split(';');
            context.cookie = {};
            cookies.forEach(function (item) {
                const crumbs = item.split('=');
                if (crumbs.length > 1) context.cookie[crumbs[0].trim()] = crumbs[1].trim();
            });
        }
        yield next;
    }
};

// exports.default = cookie;