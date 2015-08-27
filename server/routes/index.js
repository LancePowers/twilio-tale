var express = require('express');
var router = express.Router();
var twilio = require('twilio')
var utility = require('../utility/utility.js');
// console.log(twilio);
router.get('/', function(req,res,next){
  res.send('hi');
})

var message = "Once upon a time, Matthew the evangelist descended upon the land of Galvanize to enlighten and expand young minds..."
var story = "";
var cohort =
[
{name:'Alex', number:'+18593962722'},
{name:'Amber', number: '+13039194337'},
{name:'Ashley', number: '+19706586078'},
{name:'Ben', number:'+19785052189'},
{name: 'Bradley', number:'+17204733643'},
{name:'Chip', number: '+13036467088'},
{name:'Dominic', number:'+19704206721'},
{name: 'Erik', number: '+19144385692'},
{name: 'Ethan',    number:'+13038420692'},
{name: 'Johnny', number: '+13035135606'},
{name: 'Keith', number:'+15856987729'},
{name: 'Kierston', number: '+13039294135'},
{name: 'Kyle', number: '+13034756824'},
{name: 'Lance', number: '+17192381373'},
{name: 'Yusef', number: '+18082778469'},
{name: 'Lucy', number: '+14843565141'},
{name: 'Luis', number:'+17203087425'},
{name: 'Patrick', number:'+12243884883'},
{name: 'Pete', number: '+15102891955'},
{name: 'Robert', number:'+18473464660'},
{name: 'Sarah', number:'+13035200766'},
{name: 'Suhayl', number:'+17209993948'},
{name: 'Zoe', number:'+16036178399'}
];

function nextNumber(incomingNumber){
  for (var i = 0; i < cohort.length; i++) {
    if(cohort[i].number === incomingNumber){
      return(cohort[i+1].number);
    }
  }
}

function updateMessage(incomingMessage){
  story += incomingMessage + ' \n';
  message = incomingMessage;
  return message;
}

var accountSid = 'AC0b27ba7b433e49c90967b534102c8ad8';
var authToken = 'c8af31735b6f91c32b06126df0905308';

router.post('/', function(req, res, next) {
  var client = require('twilio')(accountSid, authToken);
    client.messages.create({
      to: nextNumber(req.body.From),
      // to: '+17192381373',
      from: "+17203707677",
      body: updateMessage(req.body.Body)
      // body: updateMessage(message)
    }, function(err, message) {
      console.log(message.sid);
    });
});

module.exports = router;
