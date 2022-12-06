const express = require('express')
const router = express.Router()

const User = require('../models/userStudent')

router.get('/', async (req,res) => {
		
	try{
		const students = await User.find({droped:"false",role:"student"},{registerNumber:1})
		res.json(students)
		
	}catch(err){
		res.json({ message : err })
	}	
})


router.post('/', async (req,res) => {


		const students = await User.findOneAndUpdate({registerNumber:req.body.register},{droped:"true"})
		res.json(students)
})


module.exports = router
