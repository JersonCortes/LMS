const mongoose = require('mongoose')

const UserStudentSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	registerNumber:{
		type: String,
		required: true
	},
	group:{
		type: String
	},	
	firstTimeLogged:{
		type: Boolean,
		default: false 
	}
})


module.exports = mongoose.model('UserStudents', UserStudentSchema)
