'use strict';

var mongoose = require('mongoose'),
    Reservation = mongoose.model('Reservation'),
    Seats = mongoose.model('Seats');
/*
Creates a new Reservation given its seats, username for any given user
*/
exports.book_tickets = function(req, res) {
  var new_reservation = new Reservation(req.body);
  new_reservation.save(function(err, reservation) {
    if (err)
      res.send(err);
    reservation.seats.forEach(function(seat){
       Seats.update(
         { "name": seat },
         {
           $set: {
             "status": reservation._id
           }
         },
         function(err, success) {
           res.status(200).send(reservation);
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
