
var request = require('request');
var api = require('../api-token');
var message = "Once upon a time, Matthew the evangelist descended upon the land of Galvanize to enlighten and expand young minds..."
var story = [];
var activeNumber = 17192381373;
var activeName = 'Lance';
var client = require('twilio')(api.accountSid, api.authToken);
var cohort =
[
{name: 'Lance', number: '+17192381373'},
{name: 'Yusef', number: '+18082778469'},
{name:'Amber', number: '+13039194337'},
{name:'Ashley', number: '+19706586078'},
{name:'Ben', number:'+19785052189'},
{name: 'Bradley', number:'+17204733643'},
{name: 'Brandon', number: '+17207719884'},
{name: 'Charlie', number: '+13039818484'},
{name:'Chip', number: '+13036467088'},
{name: 'Crystal', number: '+16163070351'},
{name:'Dominic', number:'+19704206721'},
{name: 'Erik', number: '+19144385692'},
{name: 'Ethan',    number:'+13038420692'},
{name: 'Johnny', number: '+13035135606'},
{name: 'Keith', number:'+15856987729'},
{name: 'Kierston', number: '+13039294135'},
{name: 'Kyle', number: '+13034756824'},
{name: 'Sarah', number:'+13035200766'},
{name: 'Lucy', number: '+14843565141'},
{name: 'Luis', number:'+17203087425'},
{name: 'Patrick', number:'+12243884883'},
{name: 'Pete', number: '+15102891955'},
{name: 'Robert', number:'+18473464660'},
{name: 'Suhayl', number:'+17209993948'},
{name: 'Zach', number: '15052802605'},
{name: 'Zoe', number:'+16036178399'},
{name: 'Michael', number: '+14156805773'},
];

//Finds the current number, sets the next as the active number and returns
function nextNumber(incomingNumber){
  console.log('function nextNumber('+incomingNumber+')')
  if(isLastNumber(incomingNumber)){
    activeNumber = cohort[0].number;
    return activeNumber;
  }
  for (var i = 0; i < cohort.length; i++) {
    if(cohort[i].number === incomingNumber){
      activeNumber = cohort[i+1].number;
      activeName = cohort[i+1].name;
      //console.log('function nextNumber', activeNumber,cohort[0])
      return activeNumber;
    }
  }
}

//determines if the incoming number is the last in the array.
function isLastNumber(incomingNumber){
  if(incomingNumber === cohort[cohort.length-1].number){
    console.log(story);
    return true;
  }
}

//determines if the incoming message is from the next user.
function isUserTurn(incomingNumber){
  console.log(incomingNumber == activeNumber);
  if(incomingNumber == activeNumber){return true;}
}

// adds incoming message to story, updates the message var, and returns.
function updateMessage(incomingMessage, incomingPicture){
    console.log('function updateMessage('+incomingMessage+','+incomingPicture+')')
    var page = {picture:incomingPicture, message: incomingMessage};
    story.push(page);
    message = incomingMessage;
    return message;
}

// sends
function sendMessage(incomingNumber, incomingMessage, incomingPicture) {
console.log('function sendMessage('+incomingNumber+','+incomingMessage+','+incomingPicture+')')
var client = require('twilio')(api.accountSid, api.authToken);
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
// {console.log('send message ', updateMessage(incomingNumber, incomingMessage), nextNumber(incomingNumber))}

function notYourTurn(incomingNumber) {
  client.messages.create({
    to: incomingNumber,
    from: "+17203707677",
    body: 'Wait your turn!'
  }, function(err, message) {
    console.log('in not your turn');
  });
}
// {console.log(incomingNumber)}

// function turn(){
//   for (var i = 0; i < cohort.length; i++) {
//     if(cohort[i].number === incomingNumber){
//       return cohort[i].name;
//     }
//   }
// }


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
