const express = require('express')
const router = express.Router()

const Classroom = require('../models/classroom')
const userStudent = require('../models/userStudent')
const verifyToken = require('../services/verifyToken')

router.post('/', async (req,res) => {
	try{
		const classroom = new Classroom({
			subject:req.body.subject,
			group:req.body.group,
			teacher:req.body.teacher
		})	

		await classroom.save()

		res.status(200).json(classroom)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/searchSubjects', async (req,res) => {
	try{
		const token = req.body.jwt
		const tokenData = await verifyToken(token)

		const group = await userStudent.findById(tokenData.uid,{password:0,registerNumber:0,role:0,_id:0,firstTimeLogged:0})
		const subjects = await Classroom.find({group:group.group})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
