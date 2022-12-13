const express = require('express')
const router = express.Router()

const verifyToken = require('../services/verifyToken')
const assistance = require('../models/assitance')

router.get('/', async (req,res) => {
	
	const token = req.body.jwt
	const tokenData = await verifyToken(token)


	const assistanceCreated = new assistance({
		student:tokenData.uid,
		room:req.body.room,
	})

	await assistanceCreated.save()
	try{
		res.status(200).json()

	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router

