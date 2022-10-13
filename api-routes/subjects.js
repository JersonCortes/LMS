const express = require('express')
const router = express.Router()

const Subject = require('../models/subjects')

router.post('/', async (req,res) => {
	try{
		const subject = new Subject({
			name:req.body.name,
			weight:req.body.weight,
			hoursPerWeek:req.body.hoursPerWeek
		})	

		await subject.save()

		res.status(200).json(subject)
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
