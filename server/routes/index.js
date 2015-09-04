var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var utility = require('../utility/utility.js');
var hunt = require('../utility/scavenger.js');


// post method.
router.post('/', function(req, res, next) {
  console.log(req.body);

  ////store to db
  new Message(req.body)
  .save(function(err, superhero) {
    // console.log(superhero);
    res.json({message: 'Success!'});
  });

  //// determine what to do with the message
  if(utility.isUserTurn(req.body.From)){
    utility.sendMessage(req.body.From, req.body.Body, req.body.MediaUrl0);
  } else {
    utility.notYourTurn(req.body.From);
  }
  res.end();
});

router.post('/hunt', function(req,res){
  hunt.processText( req.body );
  res.end();
})

router.get('/turn', function(req,res,next){
  res.render('index', {user: utility.turn()})
})

router.get('/story', function(req,res,next){
  res.render('index', {story: utility.story})
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
