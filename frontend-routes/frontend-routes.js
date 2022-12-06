const express = require('express')
const router = express.Router()
const axios = require('axios')
const checkAuth = require('../services/auth')

router.get('/login',(req,res)=>{
    	res.render('login')
})

router.get('/changePassword',(req,res)=>{
    	res.render('changepwd')
})

router.get('/postulationForm',(req,res)=>{
    	res.render('postulation_form')
})


router.get('/schedule',checkAuth(['student','teacher']),(req,res)=>{

	function getSchedule() {
	  return axios.get("http://localhost:3000/api/assignSchedule",{data:{ jwt:req.cookies.jwt}});
	}

	
	Promise.all([getSchedule()])
	  .then(function (results) {
	    const schedule = results[0].data;

	    res.render('schedule',{schedule: schedule})
	});
})

router.get('/subjects',(req,res)=>{
 
	let url = "http://localhost:3000/api/classrooms/searchSubjects"

	axios.get(url, {
		data: { jwt:req.cookies.jwt 
		}
  	})
	.then(function (response) {
		const publication = response.data
		res.render('subjects',{publication: publication})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/subjectsTeacher',(req,res)=>{

	let url = "http://localhost:3000/api/classrooms/searchTeacherSubjects"

	axios.get(url, {
		data: { jwt:req.cookies.jwt 
		}
  	})
	.then(function (response) {
		const publication = response.data
		res.render('subjectTeacher',{publication: publication})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/publicationsTeachers',(req,res)=>{
 
	let url = "http://localhost:3000/api/publication"
	axios.get(url, {
		data: {
			publicationId:req.query.publicationId
		}
	})
	.then(function (response) {
		const publication = response.data
		res.render('publicationsTeacher',{publication: publication})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/publications',(req,res)=>{
 
	let url = "http://localhost:3000/api/publication"
	axios.get(url, {
		data: {
			publicationId:req.query.publicationId
		}
	})
	.then(function (response) {
		const publication = response.data
		res.render('publications',{publication: publication})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/publicationsOne',(req,res)=>{
 
	let url = "http://localhost:3000/api/publication/one"
	axios.get(url, {
		data: {
			publicationId:req.query.publicationId
		}
	})
	.then(function (response) {
		const publication = response.data
		res.render('onePublication',{publication: publication})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/createPublication',(req,res)=>{


//cambiar esto por id de salon
	function getCriteria() {
	  return axios.get('http://localhost:3000/api/ponderation/',{data:{ classroomId:req.query.classroom}});
	}

	
	Promise.all([getCriteria()])
	  .then(function (results) {
	    const categories = results[0].data;
		
	    console.log(categories.name[0]) 
	    res.render('homeworkCreation',{categories: categories})
	});

})


router.get('/calendar',checkAuth(['student']),(req,res)=>{
    	
	res.render('calendar')
})

router.get('/checkHomework',checkAuth(['teacher']),(req,res)=>{
	function getFilesAndUsers() {
	  return axios.get('http://localhost:3000/api/assignment/',{data:{ assignment:req.query.publicationId}});
	}
	function getCriteria() {
	  return axios.get('http://localhost:3000/api/publication/one',{data:{ publicationId:req.query.publicationId}});
		
	}
	
	Promise.all([getFilesAndUsers(), getCriteria()])
	  .then(function (results) {
	    const filesAndUsers = results[0].data;
	    const criteria = results[1].data;
		
	   console.log("files and users:") 
	   console.log(filesAndUsers) 
	    res.render('checkHomework',{filesAndUsers: filesAndUsers, criteria:criteria})
	});
})

router.get('/checkHomeworkTable/:user',checkAuth(['teacher']),(req,res)=>{
	console.log(req.params.user)
	function getFiles() {
	  return axios.get('http://localhost:3000/api/assignment/'+req.params.user);
	}
	
	Promise.all([getFiles()])
	  .then(function (results) {
	    const files = results[0].data;
	    console.log(files)
	    res.render('include/_checkHomeworkTable',{files: files})
	});
})






//GENERAL ADMIN ROUTES

router.get('/postulates',checkAuth(['admin']),(req,res)=>{


	let url = "http://localhost:3000/api/postulate"
	
	axios.get(url, {
    		params: {
    		}
  	})
	.then(function (response) {
    		console.log(response.data);
		res.render('postulateTable',{postulates: response.data})
  	})
  	.catch(function (error) {
   		console.log(error);
  	})
  	.finally(function () {
  	  // always executed
  	});
})

router.get('/assignGroups',checkAuth(['admin']),(req,res)=>{
	function getUsers() {
	  return axios.get('http://localhost:3000/api/groups');
	}
	
	function getAllGroups() {
	  return axios.get('http://localhost:3000/api/groups/all');
	}
	function getAllClassrooms() {
	  return axios.get('http://localhost:3000/api/classrooms');
	}
	Promise.all([getUsers(), getAllGroups(),])
	  .then(function (results) {
	    const students = results[0].data;
	    const groups = results[1].data;
	    res.render('studentGroupAssignation',{students: students, groups:groups})
	});

})

router.get('/drop',checkAuth(['admin']),(req,res)=>{
	function getUsers() {
	  return axios.get('http://localhost:3000/api/drop');
	}
	
	Promise.all([getUsers()])
	  .then(function (results) {
	    const students = results[0].data;
	    res.render('dropped',{students: students})
	});

})

router.get('/assignDate',(req,res)=>{
    	res.render('assignDates')
})

//CAREER ADMIN ROUTES

router.get('/assignSchedule',checkAuth(['adminC']), (req,res)=>{
	
	function getAllGroups() {
	  return axios.get('http://localhost:3000/api/groups/all');
	}
	
	Promise.all([getAllGroups()])
	  .then(function (results) {
	    
	    const groups = results[0].data;

	    res.render('assignSchedule',{groups:groups})
	});

})

router.get('/assignScheduleTable/:group',checkAuth(['adminC']),(req,res)=>{
	function getGroupClassrooms() {
	  return axios.get('http://localhost:3000/api/classrooms/'+req.params.group);
	}
	function getAllSubjects() {
	  return axios.get('http://localhost:3000/api/subjects');
	}
	Promise.all([getGroupClassrooms(),getAllSubjects()])
	  .then(function (results) {
	    
	    const classrooms = results[0].data;
	    const subjects = results[1].data;

	    res.render('include/_assignScheduleTable',{classrooms:classrooms, subjects:subjects})
	});

})

router.get('/assignTeacher',checkAuth(['adminC']),(req,res)=>{
	function getUsers() {
	  return axios.get('http://localhost:3000/api/teachers',{data:{jwt:req.cookies.jwt}});
	}
	function getAllGroups() {
	  return axios.get('http://localhost:3000/api/groups/all');
	}	
	function getSubjects() {
	  return axios.get('http://localhost:3000/api/subjects',{data:{jwt:req.cookies.jwt}});
	}
	
	Promise.all([getUsers(), getAllGroups(), getSubjects()])
	  .then(function (results) {
	    const teachers = results[0].data;
	    const groups = results[1].data;
	    const subjects = results[2].data;
	    res.render('assignTeacher',{teachers: teachers, groups:groups, subjects:subjects})
	});

})
router.get('/createSubject',checkAuth(['adminC']),(req,res)=>{
    	
	res.render('createSubject')
})
//Exports for use in server.js
module.exports = router
