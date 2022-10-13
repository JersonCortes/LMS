const mongoose = require('mongoose')

const ClassroomSchema = mongoose.Schema({
	name:{
		type:String
	},
	Group:{
		type:String
	},
	Subject:{
		type:String
	}
})

module.exports = mongoose.model('Classroom', ClassroomSchema)
