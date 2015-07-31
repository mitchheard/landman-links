var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');

    // defines how Passport will handle user serialization
    // when user is authed save _id to session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne(
            {_id: id},
            // set so Mongoose doesn't fetch password field
            '-password',
            function(err, user) {
                done(err, user);
            }
        );
    });

    // local strategy config
    // load config when Passport config file in server.js is loaded
    require('./strategies/local.js')();
};
