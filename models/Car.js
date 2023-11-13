const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CarSchema = new Schema({
	id: String,
	name: String,
	zyl: String,
	kw: String,
	ccm: String,
	kmh: Number,
	firstChoice: Number,
	secondChoice: Number,
	duelsWon: Number,
	duelsLost: Number,
	duelsTie: Number,
	cardsPack: String
})
const Car = mongoose.model('Car', CarSchema)
module.exports = Car;