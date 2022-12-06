const express = require('express')
const router = express.Router()

const Classroom = require('../models/classroom')
const userStudent = require('../models/userStudent')
const verifyToken = require('../services/verifyToken')
const classroomStudent = require('../models/classroomStudent')
const Assignment = require('../models/assignment')
const Publication = require('../models/publication')
const Ponderation = require('../models/classroomPonderation')

router.post('/', async (req,res) => {
	try{
		const classroom = new Classroom({
			subject:req.body.subject,
			group:req.body.group,
			teacher:req.body.teacher
		})
		
		await classroom.save()


		const users = await userStudent.find({group:req.body.group},{})


		users.forEach(async (element)=>{

			var ClassroomStudent = new classroomStudent({
				group:req.body.group,
				classroom:classroom._id,
				student:element._id,
			})

			await ClassroomStudent.save()
		})
		
			

			var ponderation = new Ponderation({
				classroomId:classroom._id,
			})

			await ponderation.save()

		res.status(200).redirect('/assignTeacher')
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/searchSubjects', async (req,res) => {
	try{
		const token = req.body.jwt
		const tokenData = await verifyToken(token)

		const group = await userStudent.findById(tokenData.uid,{password:0,registerNumber:0,role:0,_id:0,firstTimeLogged:0})
		const subjects = await Classroom.find({group:group.group})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/searchTeacherSubjects', async (req,res) => {
	try{
		const token = req.body.jwt
		const tokenData = await verifyToken(token)
		console.log(tokenData)
		const subjects = await Classroom.find({teacher:tokenData.uid})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/', async (req,res) => {
	try{
		
		const subjects = await Classroom.find({})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})

router.get('/:group', async (req,res) => {
	try{
	console.log("Grupo"+req.params.group)
		const subjects = await Classroom.find({group:req.params.group},{teacher:0})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})



router.get('/test/testing', async (req,res) => {
	try{
		const users = await classroomStudent.find({ coursing:true })

		users.forEach(async (users)=>{
			//pido todas las tareas de la materia
			const assignations = await Publication.find({ class:users.classroom, assignation:true},{title:0,content:0,publicationDate:0})
			
			var partialGrade = 0


			assignations.forEach( async (assignation,index)=>{
				const homeworks = await Assignment.findOne({class:assignation._id, registerId:users.student},{grade:1})
				
				console.log(assignation)
				console.log("*******************")	

				if(homeworks!=null){
					if(homeworks.grade!=0){
						if(assignation.ponderation!=null){
							var ponderation = parseFloat(assignation.ponderation)
							var grade = parseFloat(homeworks.grade)
							var ponderated = (grade*ponderation)/100
							console.log("Calificacion: "+ponderated)
						}else{

						}
					}else{
						var ponderated = 0				
					}
				
				}else{
					var ponderated = 0				
				}
				partialGrade=partialGrade+ponderated
				console.log("calificacion: "+partialGrade)
				console.log("*******************")	
			})
	
		})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})




module.exports = router
