
var request = require('request');
var config = require('../_config.js');
var story = [];
var client = require('twilio')(config.accountSid, config.authToken);
var message = null;
var activeNumber = config.activeNumber;
var activeName = config.activeName;
var cohort = config.cohort;


//Finds the current number, sets the next as the active number and returns
function nextNumber(incomingNumber){
  if(isLastNumber(incomingNumber)){
    activeNumber = cohort[0].number;
    return activeNumber;
  }
  for (var i = 0; i < cohort.length; i++) {
    if(cohort[i].number === incomingNumber){
      activeNumber = cohort[i+1].number;
      activeName = cohort[i+1].name;
      return activeNumber;
    }
  }
}

//determines if the incoming number is the last in the array.
function isLastNumber(incomingNumber){
  if(incomingNumber === cohort[cohort.length-1].number){
    return true;
  }
}

//determines if the incoming message is from the next user.
function isUserTurn(incomingNumber){
  if(incomingNumber == activeNumber){return true;}
}

// adds incoming message to story, updates the message var, and returns.
function updateMessage(incomingMessage, incomingPicture){
    var page = {picture:incomingPicture, message: incomingMessage};
    story.push(page);
    message = incomingMessage;
    return message;
}

// sends
function sendMessage(incomingNumber, incomingMessage, incomingPicture) {
var client = require('twilio')(config.accountSid, config.authToken);
//send to next player
  client.messages.create({
    to: nextNumber(incomingNumber),
    from: "+17203707677",
    body: updateMessage(incomingMessage, incomingPicture)
  }, function(err, message) {
    console.log('sent', err);
  });
// send verification text
  client.messages.create({
    to: incomingNumber,
    from: "+17203707677",
    body: 'I love stories! Thank you for making this one for me. We can read it together if you want... - twilio-thanks.herokuapp.com/story',
    mediaUrl: 'https://twilio-thanks.herokuapp.com/img/mike-thanks.png'
  }, function(err, message){
        console.log(incomingNumber,'confirmed')
  });
}

// Sends a message informing that someone has played out of turn.
function notYourTurn(incomingNumber) {
  client.messages.create({
    to: incomingNumber,
    from: "+17203707677",
    body: 'Wait your turn!'
  }, function(err, message) {
    console.log('Invalid Turn');
  });
}

module.exports = {
  nextNumber: nextNumber,
  isLastNumber: isLastNumber,
  isUserTurn: isUserTurn,
  updateMessage: updateMessage,
  sendMessage: sendMessage,
  notYourTurn: notYourTurn,
  story: story,
  activeName: activeName,
}
