const mongoose = require('mongoose')

const FestiveDates = mongoose.Schema({
	event: {
		type: String
	},
	date: {
		type: Date
	}
})


module.exports = mongoose.model('FestiveDates', FestiveDates) 
