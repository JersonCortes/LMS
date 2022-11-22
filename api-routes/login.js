const express = require('express')
const router = express.Router()


const UserStudent = require('../models/userStudent')
const HashPassword = require('../services/encrypt')
const Login = require('../services/login')
const verifyToken = require('../services/verifyToken')

router.post('/', async (req,res) => {
	try{
		console.log(req.body)
		const user = await UserStudent.findOne({'registerNumber' :req.body.registerNumber})
		const jwt = await Login(req.body.password, user.password, user)
		console.log(user)
		if(user.firstTimeLogged==false){
	
			res.status(200).cookie('jwt', jwt)
			res.redirect('/changePassword')
		}else{
			res.status(200).cookie('jwt', jwt)
			res.redirect('/schedule')
		}
		
	

	}catch(err){
		res.json({ message : err })
	}	
})

router.post('/password', async (req,res) => {
	try{
		const hashedPassword = await HashPassword(req.body.password)
		const token = req.cookies.jwt
		const tokenData = await verifyToken(token)

		await  UserStudent.findByIdAndUpdate(
			tokenData.uid,
			{$set:{password: hashedPassword,firstTimeLogged:true}}
		)
		
	res.status(200).json("Password Changed")
	
	}catch(err){
		res.json({ message : err })
	}	
})




module.exports = router
