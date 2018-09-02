let generateMsg = function (from, text) {

    return {
       from,
        text,
        createdAt: new Date().getTime()
    };
};

let generateLocMsg = function (from, latitude, longitude) {

    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMsg,
    generateLocMsg
};