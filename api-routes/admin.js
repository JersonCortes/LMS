const express = require('express')
const router = express.Router()

const User = require('../models/userStudent')
const HashPassword = require('../services/encrypt')

router.get('/', async (req,res) => {
		
	try{
		const Admins = await User.find({role:'admins'})
			
		res.json(Admins)
		
	}catch(err){
		res.json({ message : err })
	}	
})


router.post('/', async (req,res) => {
	const hashedPassword = await HashPassword(req.body.password)

	const User = new User({
		username: req.body.username,
		password: hashedPassword,
		role:"admins"
	})
	
		
	try{
		const savedAdmin = await User.save()
			
		res.json(savedAdmin)
		
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
