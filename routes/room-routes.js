const router = require('express').Router();
const authCheck = require('../middleware/authCheck');
const room = require('../models/room-model');

router.use(authCheck);


router.get('/', (req, res) => {
	room.find({}).then((rooms) => {
		res.render('room-index', {
			rooms
		});
	});
});
//Adding a new room
router.post('/add', (req, res) => {
	let newRoom = new room({
		roomName: req.body.roomName
	});
//Saving a new room
	newRoom.save().then((theNewRoom) => {
		req.flash('success', 'The room '+theNewRoom.roomName+' has been added.');
		res.redirect('/room');
	});
});

router.get('/manage/:id', (req, res) => {
	let roomId = req.params.id;
	room.findOne({_id: roomId}).then((rooms) => {
		res.render('room-manage', {
			room: rooms
		});
	});
});
//Editing a room's name
router.post('/manage/:id', (req, res) => {
	let roomId = req.params.id;
	room.findOne({_id: roomId}).then((rooms) => {
		rooms.roomName = req.body.roomName;
		rooms.save().then((theNewRoom) => {
			req.flash('success', 'The room '+theNewRoom.roomName+' has been edited.');
			res.redirect('/room');
		});
	});
});

module.exports = router; 
