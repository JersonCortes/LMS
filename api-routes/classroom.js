const express = require('express')
const router = express.Router()

const Classroom = require('../models/classroom')

router.post('/', async (req,res) => {
	try{
		const name = req.body.name+" "+req.body.group
		const classroom = new Classroom({
			name:name,
			subject:req.body.name,
			group:req.body.group
		})	

		await classroom.save()

		res.status(200).json(classroom)
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
