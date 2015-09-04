var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Message = new Schema(
  {
    Body: String,
    MediaUrl0: String,
  }
);

mongoose.model('messages', Message);
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/node-message")
