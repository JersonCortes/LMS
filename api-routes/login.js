const express = require('express')
const router = express.Router()

const UserStudent = require('../models/userStudent')
const HashPassword = require('../services/encrypt')


router.patch('/password/:userId', async (req,res) => {

	try{
		const hashedPassword = await HashPassword(req.body.newPwd)

		const studentUser = await  UserStudent.findByIdAndUpdate(
			req.params.userId,
			{password: hashedPassword}
		)
		
	res.status(200).json("Password Changed")
	
	}catch(err){
		res.json({ message : err })
	}	
})




module.exports = router
