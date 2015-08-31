var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var utility = require('../utility/utility.js')


// post method.
router.post('/', function(req, res, next) {
  console.log(req.body);
  if(utility.isUserTurn(req.body.From)){
    utility.sendMessage(req.body.Body, req.body.MediaUrl);
  } else {
    utility.notYourTurn(req.body.From);
  }
  res.end();
});

router.post('/test', function(req,res){
  var tag = utility.getImageTag(req.body.url);
  res.end();
})
router.get('/story', function(req,res,next){
  res.render('index', {story: utility.story})
})

module.exports = router;
