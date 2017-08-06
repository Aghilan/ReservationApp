'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
  seats: {
    type: [{
      type: String,
    }],
    Required: 'Kindly enter the seat numbers'
  },
  userId: {
    type: String,
    Required: 'Kindly enter your userID'
  },
  Created_date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
