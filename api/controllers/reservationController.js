'use strict';

var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation'),
    Seats = mongoose.model('Seats');
/*
Lists all the reservation made for any given user
*/
exports.get_reservation = function(req, res) {
  Reservation.find({userId: req.params.userId},function(err,reservations){
    if(err)
      res.send(err);
    res.json(reservations)
  })
};

/*
Creates a new Reservation given its seats, username for any given user
*/
exports.book_tickets = function(req, res) {
  var new_reservation = new Reservation(req.body);
  new_reservation.userId= req.params.userId
  new_reservation.save(function(err, reservation) {
    if (err) {
      return res.send(err);
    }
    reservation.seats.forEach(function(seat,i){
       Seats.update(
         { "name": seat },
         {
           $set: {
             "status": reservation._id
           }
         }, function(err,success){
           if(i === reservation.seats.length-1){
             res.send(reservation);
           }
         });
      })
  });
};

/*
  Cancels an previous reservation
*/
exports.cancel_reservation = function(req, res) {
  Reservation.remove({
    _id: req.body.reservationId,
    userId: req.params.userId
  }, function(err, cancelled_reservation) {
    if (err)
      return res.send(err);
    Seats.update(
      { "status": req.body.reservationId },
      {
        $set: {
          "status": "AVLB"
        }
      },
      { multi: true },
      function(err, success){
        if(err)
          return res.send(err);
        res.json({ message: 'Reservation ' + req.body.reservationId + ' successfully cancelled' });
      }
    );
  });
};
