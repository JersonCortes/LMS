const express = require('express')
const router = express.Router()

const UserStudent = require('../models/userStudent')
const Group = require('../models/groups')


router.get('/', async (req,res) => {
	try{
		const user = await UserStudent.find({'group' : '1'},{'password':0, 'firstTimeLogged':0})
		
		res.status(200).json(user)

	}catch(err){
		res.json({ message : err })
	}	
})

router.patch('/', async (req,res) => {
	try{	
		await UserStudent.findOneAndUpdate({'registerNumber': req.body.registerNumber},{group: req.body.group})
		
		res.status(200).json()

	}catch(err){
		res.json({ message : err })
	}	
})

router.post('/create', async (req,res) => {
	try{
		const groups = new Group({
			group:req.body.group
		})

		await groups.save()

		res.status(200).json(groups)

	}catch(err){
		res.json({ message : err })
	}	
})
module.exports = router
