/**
 * use moment to format date
 * @type {moment | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => moment.Moment) | ((inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean) => moment.Moment)}
 */
const moment = require('moment');


let timestamp = moment().valueOf();// prints in milliseconds
console.log(timestamp);


let date = moment();
console.log(date.format('hh:mm a'));// prints in correct required format