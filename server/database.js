var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Message = new Schema(
  {
    body: String,
    mediaUrl0: String,
  }
);

mongoose.model('messages', Message);
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/node-message")
