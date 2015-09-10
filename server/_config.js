
var AlchemyAPI = require('alchemy-api');

// update these!
var accountSid = process.env.ACCOUNTSID;
var authToken = process.env.AUTHTOKEN;
var alchemyKey = process.env.ALCHEMYKEY;
var activeNumber = process.env.ACTIVENUMBER;
var activeName = process.env.ACTIVENAME;
var cohort = [
  {name:'Lance',number:'+17192381373'},
  {name:'Yusef',number:'+18082778469'},
  {name:'Amber',number:'+13039194337'},
  {name:'Ashley',number:'+19706586078'},
  {name:'Ben',number:'+19785052189'},
  {name:'Bradley',number:'+17204733643'},
  {name:'Brandon',number:'+17207719884'},
  {name:'Charlie',number:'+13039818484'},
  {name:'Chip',number:'+13036467088'},
  {name:'Crystal',number:'+16163070351'},
  {name:'Dominic',number:'+19704206721'},
  {name:'Erik',number:'+19144385692'},
  {name:'Ethan',number:'+13038420692'},
  {name:'Johnny',number:'+13035135606'},
  {name:'Keith',number:'+15856987729'},
  {name:'Kierston',number:'+13039294135'},
  {name:'Kyle',number:'+13034756824'},
  {name:'Sarah',number:'+13035200766'},
  {name:'Lucy',number:'+14843565141'},
  {name:'Luis',number:'+17203087425'},
  {name:'Patrick',number:'+12243884883'},
  {name:'Pete',number:'+15102891955'},
  {name:'Robert',number:'+18473464660'},
  {name:'Suhayl',number:'+17209993948'},
  {name:'Zach',number:'15052802605'},
  {name:'Zoe',number:'+16036178399'},
  {name:'Michael',number:'+14156805773'}
]

var alchemy = new AlchemyAPI(alchemyKey);

module.exports = {
    accountSid: accountSid,
    authToken: authToken,
    alchemy: alchemy,
    activeName: activeName,
    activeNumber: activeNumber,
    cohort: cohort
}
