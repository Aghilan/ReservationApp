'use strict';

module.exports = function(app) {
	var reservation = require('../controllers/reservationController');
	var seats = require('../controllers/seatsController');
	var user = require('../controllers/userController')

	app.route('/seats')
		.get(seats.get_available_seats);

	app.route('/seats_status')
		.get(seats.get_seat_status)

	app.route('/users/:userId/reservation')
		.post(reservation.book_tickets)
		.delete(reservation.cancel_reservation);

	app.route('/users')
		.get(user.get_all_user)
		.post(user.register_user);

	app.route('/users/auth')
		.post(user.authenticate_user);
};
