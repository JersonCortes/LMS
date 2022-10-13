const mongoose = require('mongoose')

const SubjectSchema = mongoose.Schema({
	name:{
		type:String
	},
	weight:{
		type:String
	},
	hoursPerWeek:{
		type:Number
	}
})

module.exports = mongoose.model('Subjects', SubjectSchema)
