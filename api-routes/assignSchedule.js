const express = require('express')
const router = express.Router()

const Groups = require('../models/groups')
const userStudent = require('../models/userStudent')
const verifyToken = require('../services/verifyToken')
router.post('/', async (req,res) => {
	try{
		console.log(req.body.group)

		const schedule = await Groups.findOneAndUpdate({group:req.body.group}, {schedule:req.body.hourSelect});
		res.json(schedule)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/', async (req,res) => {
	try{
		const token = req.body.jwt
		const tokenData = await verifyToken(token)
		const group = await userStudent.findById(tokenData.uid,{password:0,registerNumber:0,role:0,_id:0,firstTimeLogged:0})

		const schedule = await Groups.findOne({group:group.group});
		res.json(schedule)
	}catch(err){
		res.json({ message : err })
	}	
})


module.exports = router
