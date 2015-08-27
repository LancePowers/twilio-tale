var express = require('express');
var router = express.Router();
var twilio = require('twilio')
var utility = require('../utility/utility.js');
// console.log(twilio);

router.post('/', function(req, res, next) {
  utility.sendMessage(req.params.body, req.params.from)
});

module.exports = router;
