const express = require('express')
const router = express.Router()

const User = require('../models/userStudent')
const HashPassword = require('../services/encrypt')

router.get('/', async (req,res) => {
		
	try{
		const Teachers = await User.find({role:'teacher'},{password:0,firstTimeLogged:0})
			
		res.json(Teachers)
		
	}catch(err){
		res.json({ message : err })
	}	
})


router.post('/', async (req,res) => {
	const hashedPassword = await HashPassword(req.body.password)

	const teacherUser = new User({
		registerNumber: req.body.username,
		username: req.body.username,
		password: hashedPassword,
		role:"teacher"
	})
	
		
	try{
		const savedTeacher = await teacherUser.save()
			
		res.json(savedTeacher)
		
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
