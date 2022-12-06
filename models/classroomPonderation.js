const mongoose = require('mongoose')

const ClassroomPonderation = mongoose.Schema({
	classroomId:{
		type:String
	},
	name:[{
		type:String
	}],
	ponderation:[{
		type:String
	}]
})

module.exports = mongoose.model('ClassroomPonderation', ClassroomPonderation)
