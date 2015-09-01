
var accountSid = 'AC0b27ba7b433e49c90967b534102c8ad8';
var authToken = 'c8af31735b6f91c32b06126df0905308';
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('9091af0333d153485f16109521984d39b19ba7ac');

module.exports = {
    accountSid: accountSid,
    authToken: authToken,
    alchemy: alchemy,
}
