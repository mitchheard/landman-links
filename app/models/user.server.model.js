var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  // unique index
  username: {
    type: String,
    trim: true,
    unique: true
  },
  // secondary email index
  email: {
    type: String,
    index: true
  },
  password: String,
  // strategy used to register the user
  provider: String,
  // user identifier for auth strategy
  providerId: String,
  // store use object retrieved from OAuth providers
  providerData: {},
  todos: {} // we will use this to store todos
});

// pre-save middleware to md5 hash and update password before saving to mongodb
UserSchema.pre('save',
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }

        next();
    }
);

// accepts string password argument
// hashes and compares to current hashed password
UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

// static method used to find an available unique username for new users
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

mongoose.model('User', UserSchema);
