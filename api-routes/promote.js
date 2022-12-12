const express = require('express')
const router = express.Router()
const classroomStudent = require('../models/classroomStudent')


router.get('/', async (req,res) => {

		const classrooms = await classroomStudent.find({ coursing:true })

		classrooms.forEach(async (classroom)=>{
            		console.log(classroom)


			const classroomSubject = await Classroom.findById(classroom.classroom,{subject:1})
			

		})
	try{
					res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	

})



module.exports = router
