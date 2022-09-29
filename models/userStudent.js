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
	firstTimeLogged:{
		type: Boolean,
		default: false 
	}
})


module.exports = mongoose.model('UserStudents', UserStudentSchema)
