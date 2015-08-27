var express = require('express');
var router = express.Router();
var twilio = require('twilio')
var utility = require('../utility/utility.js');
// console.log(twilio);
router.get('/', function(req,res,next){
  res.send('hi');
})

var accountSid = 'AC0b27ba7b433e49c90967b534102c8ad8';
var authToken = 'c8af31735b6f91c32b06126df0905308';

router.post('/', function(req, res, next) {
  var client = require('twilio')(accountSid, authToken);
    client.messages.create({
      // to: nextNumber(number),
      to: '+17192381373',
      from: "+17203707677",
      body: 'work please'
      // body: updateMessage(message)
    }, function(err, message) {
      console.log(message.sid);
    });
});

module.exports = router;
