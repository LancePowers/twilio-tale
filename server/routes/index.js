var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var utility = require('../utility/utility.js');
var config = require('../_config.js');
var hunt = require('../utility/scavenger.js');
var mongoose = require('mongoose');
var Message = mongoose.model('messages');


// post method.
router.post('/', function(req, res, next) {
  console.log(req.body);

  ////store to db
  new Message({body: req.body.Body, mediaUrl0: req.body.MediaUrl0})
  .save(function(err, data) {

    //// determine what to do with the message
    if(utility.isUserTurn(req.body.From)){
      utility.sendMessage(req.body.From, req.body.Body, req.body.MediaUrl0);
    } else {
      utility.notYourTurn(req.body.From);
    }
    res.end();
  });
});

router.post('/hunt', function(req,res){
  hunt.processText( req.body );
  res.end();
})

router.get('/turn', function(req,res,next){
  res.render('turn', {user: config.activeName})
})

router.get('/story', function(req,res,next){
  res.render('index', {story: utility.story})
})

router.get('/', function(req,res,next){
  res.redirect('/story');
})

router.get('/story/edit', function(req,res,next){
  res.render('edit', {story: utility.story})
})

router.post('/story/edit', function(req,res){
  console.log(req.body.index);
  utility.story.splice((req.body.index - 1),1);
  res.redirect('/story');
})



module.exports = router;
