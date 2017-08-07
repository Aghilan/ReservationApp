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
  Seats.find({}).sort('name').exec(function(err, seats){
    var theaterSeats = [];
    var rowSeats = [];
    seats.forEach(function(seat,i){
      rowSeats.push(seat);
      if(i==7 || i==seats.length-1){
        theaterSeats.push(rowSeats);
        rowSeats = [];
      }
    })
    res.status(200).send(theaterSeats);
  })
};
