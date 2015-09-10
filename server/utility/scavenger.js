var api = require('../_config.js');
var client = require('twilio')(api.accountSid, api.authToken);

function Game(name){
  this.name = name;
  this.messages = [];
  this.players = [];
  this.keyword = 'person';
  this.activePlayer = null;
  this.currentMessage = null;
  this.timer = 1;
}
//Create a new message an process the next turn.
Game.prototype.processText = function(text){
  messages.push(new Message(text));
  this.currentMessage = messages[messages.length-1];
  //if it's an image text
  if(text.MediaUrl0 !== undefined){
    this.currentMessage.getImageTag(text.MediaUrl0);
    this.imageResponse();
  } else {
  // if it's a keyword text
    this.keywordResponse();
  }
}

Game.prototype.imageResponse = function () {
  if(this.currentMessage.tag === this.keyword){
    this.sendText(this.activePlayer.number, "Success! Now it's your turn, respond with a new keyword.");
    this.score += 1;
  } else if(this.currentMessage.firstTry){
    this.sendText(this.activePlayer.number, "Bummer, "+ this.currentMessage.tag +" was not the keyword. You can try again.");
    this.currentMessage.firstTry = false;
  } else {
    for (var i = 0; i < this.players.length; i++) {
      this.sendText(this.players[i].number,this.activePlayer.name + 'failed! Top score was '+ this.score)
    }
  }
};

Game.prototype.keywordResponse = function () {
  var key = this.currentMessage.message;
  var keyCount = key.split(" ").length;
  if( keyCount > 1 ){ this.sendMessage( this.activePlayer.number, 'You have to send a single keyword')}
  else{
    this.keyword = key;
    this.changePlayer(1);
    this.sendMessage('Your keyword is '+ keyword + ". You have 30 min to send a picture. Don't let your team down!");
    this.timer += 1;
    setTimeour(this.timeCheck(this.timer), 2 * 60 * 1000);
  }
};

Game.prototype.timeCheck = function(timerCache){
  if(timerCache === this.timer){
    this.players.splice(this.activePlayer)
  };
}

Game.prototype.changePlayer = function (x) {
  for (var i = 0; i < this.players.length; i++) {
    if(this.players[i] === this.activePlayer){
      this.activePlayer = this.players[i + x];
    }
  }
};
//sends a text with given parameters
Game.prototype.sendText = function(text){
  client.messages.create({
    to: this.activePlayer.number,
    from: "+17203707677",
    body: text,
  }, function(err, message) {
    console.log('sent', err);
  });
}



function Message(twilioText){
  this.number = twilioText.From;
  this.message = twilioText.Body;
  this.picture = twilioText.MediaUrl0;
  this.tag = null;
  this.firstTry = true;
  this.secondTry = true;
}


Message.prototype.getImageTag = function(url){
  var self = this;
  if(url !== undefined){
    api.alchemy.imageKeywords(url, {}, function(err, response) {
      if (err) throw err;
      var imageKeywords = response.imageKeywords;
      self.tag = imageKeywords;
    });
  }
};



//set the first keyword
//send keyword to next player
// if tag = keyword, prompt for next keyword.
// else return the tag and message
// if 2nd time, send message to previous player
//if 2nd player response is no bueno splice em
//else splice player before
//move on to next player
//when length = 1, announce player wins

//? timeout
//? verify picture taken call bullshit?


module.exports = {
    Message: Message,
    Game: Game,
}
