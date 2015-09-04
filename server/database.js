var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Message = new Schema(
  {
    body: String,
    mediaUrl0: String,
  }
);

mongoose.model('superheros', Superhero);

mongoose.connect('mongodb://localhost/node-superhero');
