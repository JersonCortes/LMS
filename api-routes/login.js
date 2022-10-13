const express = require('express')
const router = express.Router()


const UserStudent = require('../models/userStudent')
const HashPassword = require('../services/encrypt')
const Login = require('../services/login')

router.post('/', async (req,res) => {
	try{
		const user = await UserStudent.findOne({'registerNumber' :req.body.registerNumber})
		const jwt = await Login(req.body.password, user.password,user)

		await UserStudent.findOneAndUpdate({'registerNumber': req.body.registerNumber},{firstTimeLogged: true})
		
		res.status(200).cookie('jwt', jwt).json()

	}catch(err){
		res.json({ message : err })
	}	
})

router.patch('/password/:userId', async (req,res) => {

	try{
		const hashedPassword = await HashPassword(req.body.newPwd)

		await  UserStudent.findByIdAndUpdate(
			req.params.userId,
			{password: hashedPassword}
		)
		
	res.status(200).json("Password Changed")
	
	}catch(err){
		res.json({ message : err })
	}	
})




module.exports = router
