'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/*
Prints out all the registered users
*/
exports.get_all_user = function(req, res) {
  User.find({}, function(err, user){
    if (err)
      res.send(err);
    res.status(200).send(user);
  });
};

/*
Authenticates a user given username and password as Strings
*/
exports.authenticate_user = function(req, res) {
  User.findOne({ username : req.body.username, password: req.body.password }, function(err, user) {
    if (err)
      res.send(err);
    // Username not exists in DB
    if(user === null) {
      res.status(404).send({});
    }
    else{
      res.json(user);
    }
  });
};

/*
Registers a new user
*/
exports.register_user = function(req, res) {
  User.find({ username : req.body.username } , function(err, user) {
    if (err)
      res.send(err);
    // validates if username already exists
    if (user.length!=0) {
      res.status(409).send();
    }
    else{
      var new_user = new User(req.body);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.status(200).send(user);
      });
    }
  });
};
