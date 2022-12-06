const express = require('express')
const router = express.Router()

const Ponderation = require('../models/classroomPonderation')

router.post('/', async (req,res) => {
	try{
		console.log("entro")
		await Ponderation.findOneAndUpdate({classroomId:req.body.id},{
			$push:{
			name: req.body.categoryCreateName,
			ponderation: req.body.categoryPonderation
			}
		})
	
		await Ponderation.save()

		res.status(200).redirect('/homeworkCreation')
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/', async (req,res) => {
	try{
	
		console.log(req.body)
		const ponderation = await Ponderation.findOne({classroomId:req.body.classroomId})
	
		res.status(200).json(ponderation)
	}catch(err){
		res.json({ message : err })
	}	
})

module.exports = router
