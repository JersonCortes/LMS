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
		const classrooms = await classroomStudent.find({ coursing:true })
		
		function Tarea(category,grade,student,custom,ponderated){

			this.category=category;
			this.grade=grade;
			this.student=student;
			this.custom=custom;
			this.ponderated=ponderated;
		}

		var tareas = []

		classrooms.forEach(async (classroom)=>{
			//pido todas las tareas de la materia
			const publications = await Publication.find({ class:classroom.classroom, assignation:true},{title:0,content:0,publicationDate:0})

			const ponderation = await Ponderation.findOne({classroomId:classroom.classroom})

			var partialGrade = 0
			
			//Pasamos por cada publicacion
			publications.forEach( (publication)=>{
				//la tarea de la publicacion
				const assignment = Assignment.findOne({class:publication._id, registerId:classroom.student},{grade:1})
			
				if(assignment!=null){
					tareas.push(new Tarea(publication.category,assignment.grade,classroom.student,publication.ponderation,(publication.ponderation!=null ? true:false)))
				}	
			})

			console.log(tareas)
			
			var tareasSinPonderar=tareas.find(homework=>homework.grade>50);	


		})
	
		res.status(200).json(subjects)
	}catch(err){
		res.json({ message : err })
	}	
})




module.exports = router
