var users    = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.route('/users').post(users.create).get(users.list);

  //app.route('/users/:userId').get(users.read).put(users.update);

  app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
  // handles the population of the req.user object
  // defines a middleware to be executed before any other middleware that uses that parameter
  // users.userByID will be executed before any other middleware,
  // registered with the userId param, is this case is the users.read() middleware
  app.param('userId', users.userByID);

  app.route('/register')
        .get(users.renderRegister)
        .post(users.register);

    app.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.get('/logout', users.logout);
};
