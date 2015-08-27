var express = require('express');
var router = express.Router();
var twilio = require('twilio')
var utility = require('../utility/utility.js');
// console.log(twilio);
router.get('/', function(req,res,next){
  res.send('hi');
})
router.post('/', function(req, res, next) {
  utility.sendMessage(req.body.body, req.body.from)
  res.send('hi')
});

module.exports = router;
