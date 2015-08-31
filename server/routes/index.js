var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var utility = require('../utility/utility.js')
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('9091af0333d153485f16109521984d39b19ba7ac');

// post method.
router.post('/', function(req, res, next) {
  if(utility.isUserTurn(req.body.From)){
    utility.sendMessage(req.body.From, req.body.Body, req.body.MediaUrl);
  } else {
    utility.notYourTurn(req.body.From);
  }
  res.end();
});

router.post('/test', function(req,res){
  var tag = utility.getImageTag(req.body.url);
})
router.get('/story', function(req,res,next){
  res.render('index',{title: utility.story})
})

module.exports = router;
