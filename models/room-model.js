const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	roomName: String
})

const Room = mongoose.model('room', roomSchema)

module.exports = Room;