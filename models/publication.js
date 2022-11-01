mongoose = require('mongoose')

const PublicationSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	class:{
		type: String,
		required: true
	},
	assignation:{
		type: Boolean,
		default: false
	},
	date:{
		type: Date
	},
	files:[{ 
		contentType: String, 
		data: Buffer,
		name: String
	}]

})



module.exports = mongoose.model('Publication', PublicationSchema)
