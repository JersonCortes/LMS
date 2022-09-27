const express = require('express')
const router = express.Router()

const UserStudent = require('../models/userStudent')

router.patch('/password/:id', async (req,res) => {
	//creates a new postulate with the data in the request body
	const studentUser = await  UserStudent.findOneAndUpdate({
		password: "123",
	})
	//Sends the data to the database or responds with error
	try{
		console.log(req.body.username)
		const savedPostulate = await studentUser.save()
		res.json(savedPostulate)
		
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
