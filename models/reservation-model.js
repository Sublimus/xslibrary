const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'room'
	},
	startTime: Date,
	endTime: Date
})

const Room = mongoose.model('reservation', reservationSchema)

module.exports = Room;