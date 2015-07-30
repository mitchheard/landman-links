// handles all the requests for user relates operations
var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) {
      return next(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }
    else {
      res.json(users);
    }
  });
};

// responds with a JSON representation of the req.user object
exports.read = function(req, res) {
  res.json(req.user);
};
// middleware populating the req.user object
// will use to deal with manipulation of single documents when performing CRUD operations
exports.userByID = function(req, res, next, id) {
  User.findOne({
      _id: id
    },
    function(err, user) {
      if (err) {
        return next(err);
      }
      else {
        req.user = user;
        next();
      }
    }
  );
};
