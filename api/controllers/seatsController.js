'use strict';

var mongoose = require('mongoose'),
    Seats = mongoose.model('Seats');

/*
Returns all available seats count at any point
*/
exports.get_available_seats = function(req, res) {
    Seats.count({ "status":"AVLB"}, function(err, count){
        res.status(200).send({"count": count});
    });
};

/*
Prints information like all seats and available seats
*/
exports.get_seat_status = function(req, res) {
  Seats.find({}, function(err, seats) {
    if (err)
      res.send(err);
    if(seats  == null){
      res.status(404).send({});
    }
    res.json(seats);
  });
};
