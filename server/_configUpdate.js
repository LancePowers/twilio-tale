
var AlchemyAPI = require('alchemy-api');

// update these!
var accountSid = process.env.ACCOUNTSID || 'ENTER YOUR OWN';
var authToken = process.env.AUTHTOKEN || 'ENTER YOUR OWN'
var alchemyKey = process.env.ALCHEMYKEY || 'ENTER YOUR OWN'
var activeNumber = process.env.ACTIVENUMBER || 'STARTING NUMBER (as integer)';
var activeName = process.env.ACTIVENAME || 'STARTING NAME';
var cohort = process.env.COHORT || [
  {name: 'some name', number: 'somw number'}
];

var alchemy = new AlchemyAPI(alchemyKey);

module.exports = {
    accountSid: accountSid,
    authToken: authToken,
    alchemy: alchemy,
    activeName: activeName,
    activeNumber: activeNumber,
    cohort: cohort
}
