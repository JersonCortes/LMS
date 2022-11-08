const express = require('express')
const router = express.Router()

const Classroom = require('../models/classroom')

router.post('/', async (req,res) => {
	try{
		const classroom = new Classroom({
			subject:req.body.name,
			group:req.body.group,
			teacher:req.body.teacher
		})	

		await classroom.save()

		res.status(200).json(classroom)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/', async (req,res) => {
	try{
		const classrooms = await Classroom.find({})
	
		res.status(200).json(classrooms)
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
