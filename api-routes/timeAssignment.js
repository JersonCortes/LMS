const express = require('express')
const router = express.Router()

const TimeAssignments = require('../models/timeAssignments')

router.get('/', async (req,res) => {
	try{
		const dates = await TimeAssignments.find()
		
		res.status(200).json(dates)

	}catch(err){
		res.json({ message : err })
	}	
})

router.post('/', async (req,res) => {
	try{
		const dates = new TimeAssignments({
			startSemester: req.body.startSemester,
			endSemester: req.body.endSemester,
			startFirstPartial: req.body.startFirstPartial,
			endFirstPartial: req.body.endFirstPartial,
			startSecondPartial: req.body.startSecondPartial,
			endSecondPartial: req.body.endSecondPartial,
			startThirdPartial: req.body.startThirdPartial,
			endThirdPartial: req.body.endThirdPartial
		})

		const savedDate = await dates.save()
		

		res.status(200).json(savedDate)

	}catch(err){
		res.json({ message : err })
	}	
})

router.patch('/', async (req,res) => {
	try{
		await TimeAssignments.findOneAndUpdate({},{
			startSemester: req.body.startSemester,
			endSemester: req.body.endSemester,
			startFirstPartial: req.body.startFirstPartial,
			endFirstPartial: req.body.endFirstPartial,
			startSecondPartial: req.body.startSecondPartial,
			endSecondPartial: req.body.endSecondPartial,
			startThirdPartial: req.body.startThirdPartial,
			endThirdPartial: req.body.endThirdPartial
		})
		res.status(200).json(dates)

	}catch(err){
		res.json({ message : err })
	}	
})
module.exports = router
