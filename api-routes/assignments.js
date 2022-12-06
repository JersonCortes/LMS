const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const Assignment = require('../models/assignment')
const verifyToken = require('../services/verifyToken')

const UserStudent = require('../models/userStudent')
const upload = multer({ dest: 'uploads/'})

router.post('/',upload.array('files', 4), async (req,res) => {
	const token = req.cookies.jwt
	const tokenData = await verifyToken(token)

	const user = await  UserStudent.findById(tokenData.uid,{career:1,registerNumber:1})
	console.log(user)
	//class is equal to the assignmentId
	const assignment = new Assignment({
			registerId:tokenData.uid,
			register:user.registerNumber,
			class:req.body.assignment,
			date: new Date()
	})

	if(req.files){
		req.files.forEach(function(files,index){
			assignment.files[index] = {
				data:fs.readFileSync(req.files[index].path),
				contentType:req.files[index].mimetype,
				name:req.files[index].originalname
			}	
		})
	}


	try{
		await assignment.save()

		res.status(200).json(assignment)

	}catch(err){
		
		res.json({ message : err })

	}
})

router.get('/', async (req,res)=>{
	try{
		console.log("test")
		const homeworks = await Assignment.find({class:req.body.assignment},{"files.data":0})
		res.status(200).json(homeworks)
	}catch(err){
		res.json({ message : err })
	}
})



router.get('/:user', async (req,res)=>{
	try{
		console.log(req.params.user)
		const homeworks = await Assignment.findOne({register:req.params.user},{"files.data":0})
		res.status(200).json(homeworks)
	}catch(err){
		res.json({ message : err })
	}
})

router.post('/grade', async (req,res)=>{
	try{
		console.log(req.body)
		if(Array.isArray(req.body.grade)){
			let grade = 0 
			for(var i=0; i< req.body.grade.length; i++){
				grade = parseInt(req.body.grade[i],10) + grade
			}	
			
			const homeworks = await Assignment.findOneAndUpdate({register:req.body.register},{grade:grade, graded:true})
		}else{
			
			const homeworks = await Assignment.findOneAndUpdate({register:req.body.register},{grade:req.body.grade, graded:true})
		}
		res.status(200).json(homeworks)
	}catch(err){
		res.json({ message : err })
	}
})


router.get('/files/:homeworkId', async (req,res)=>{
	try{
		const homework = await Assignment.findOne({ "files._id": req.params.homeworkId},{"files" : 1})

		homework.files.forEach(function(files,index){

			if(homework.files[index]._id==req.params.homeworkId){
				res.setHeader("Content-Type",homework.files[index].contentType)	
				res.setHeader("Content-Disposition","inline; filename="+homework.files[index].name)
				res.send(homework.files[index].data)
			}

		})
	}catch(err){
		res.json({ message : err })
	}
})

module.exports = router
