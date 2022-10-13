const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
	Group:{
		type:String
	}
})

module.exports = mongoose.model('Group', GroupSchema)
