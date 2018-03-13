const router = require('express').Router();
const room = require('../models/room-model');
const authCheck = require('../middleware/authCheck');
const reservation = require('../models/reservation-model');


router.get('/', (req, res) => {
	room.find({}).then((rooms) => {
		reservation.find({user: req.user._id}).populate('room').exec((err, reservations) => {
			res.render('reservation-index', {
				rooms,
				reservations
			});
		});
	});
})
//Adding a new reservation
router.post('/add', (req, res) => {
	let newReservation = new reservation({
		user: req.user._id,
		room: req.body.room,
		startTime: req.body.startTime,
		endTime: req.body.endTime
	});

//Saving a reservation
	newReservation.save((err, data) => {
		req.flash('success', 'Reservation has been added');
		res.redirect('/reservation');
	})
})

//Managing a reservation
// router.get('/manage/:id', (req, res) => {
// 	let reservationId = req.params.id;
// 	reservation.findOne({_id: reservationId}).then((reservations) => {
// 		res.render('reservation-manage', {
// 			reservation: reservations
// 		});
// 	});
// });

// Deleting a reservation
router.get('/remove/:id', (req, res) => {

	// Gets the ID parameter from the url field (/reservation/remove/123456789) -> returns 123456789
	let reservationId = req.params.id;

	// Searches the reservation from the reservation id to check if it exists and then removes it from the database
	reservation.remove({_id: reservationId}).then((reservations) => {

		// Adds a success flash message and redirects the user to the main reservation page
		req.flash('success', 'Reservation has been deleted');
		res.redirect('/reservation');
	});
});


module.exports = router;
