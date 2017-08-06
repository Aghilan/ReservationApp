var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Reservation = require('./api/models/reservationModel'),
  User = require('./api/models/userModel'),
  Seats = require('./api/models/seatsModel'),
  bodyParser = require('body-parser');

var cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Reservationdb');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/reservationRoutes');
routes(app);

app.listen(port);

console.log('Reservation RESTful API server started on: ' + port);
