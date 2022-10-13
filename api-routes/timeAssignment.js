const express = require('express')
const router = express.Router()

const TimeAssignments = require('../models/timeAssignments')
const SetDates = require('../services/endsemester')

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
			startSecondPartial: req.body.startSecondPartial,
			startThirdPartial: req.body.startThirdPartial,
		})
		
		SetDates(req.body.startFirstPartial,req.body.startSecondpartial,req.body.startThirdPartial, req.body.endSemester)

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
			startSecondPartial: req.body.startSecondPartial,
			startThirdPartial: req.body.startThirdPartial,
		})

		res.status(200).json(dates)

	}catch(err){
		res.json({ message : err })
	}	
})
module.exports = router
