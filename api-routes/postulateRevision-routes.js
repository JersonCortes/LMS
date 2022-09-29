const express = require('express')
const router = express.Router()

const UserStudent = require('../models/userStudent')
const HashPassword = require('../services/encrypt')

router.post('/', async (req,res) => {

	const hashedPassword = await HashPassword(req.body.birthday)


	const studentUser = new UserStudent({
		username: req.body.username,
		password: hashedPassword
	})

	try{
		const savedPostulate = await studentUser.save()
		res.json(savedPostulate)
		
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
