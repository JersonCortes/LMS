const mongoose = require('mongoose')

const PostulateSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	birthday:{
		type: Date,
		default: Date.now,
		required: true
	},
	email:{
		type: String,
		required :true
	},
	certHighschool:{
		data: Buffer,
		contentType: String
	},
	curp:{
		data: Buffer,
		contentType: String
	},
	birthdayCert:{
		data: Buffer,
		contentType: String
	},
	antidoping:{
		data: Buffer,
		contentType: String
	}
})


module.exports = mongoose.model('Postulates', PostulateSchema)
