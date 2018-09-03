const moment = require('moment');

let generateMsg = function (from, text) {

    return {
       from,
        text,
        createdAt: moment().valueOf()
    };
};

let generateLocMsg = function (from, latitude, longitude) {

    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {
    generateMsg,
    generateLocMsg
};