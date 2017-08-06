'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeatsSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the seat number'
  },
  status: {
    type: String,
    default: 'AVLB'
  }
});

module.exports = mongoose.model('Seats', SeatsSchema);
