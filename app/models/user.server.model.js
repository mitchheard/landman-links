var mongoose = require('mongoose'),
    Schema - mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

mongoose.model('User', UserSchema);
