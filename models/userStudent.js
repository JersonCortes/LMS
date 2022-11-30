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
	},
	group:{
		type: String
	},		
	role:{
		type: String, 
	},
	firstTimeLogged:{
		type: Boolean,
		default: false 
	},
	career:{
		type: String,
	}
})


module.exports = mongoose.model('UserStudents', UserStudentSchema)
