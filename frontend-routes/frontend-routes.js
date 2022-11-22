const express = require('express')
const router = express.Router()
const axios = require('axios')
const checkAuth = require('../services/auth')

router.get('/',(req,res)=>{
    	res.render('login')
})

router.get('/changePassword',(req,res)=>{
    	res.render('changepwd')
})

router.get('/postulationForm',(req,res)=>{
    	res.render('postulation_form')
})

router.get('/createSubject',(req,res)=>{
    	res.render('createSubject')
})

router.get('/assignDate',(req,res)=>{
    	res.render('assignDates')
})

router.get('/assignTeacher',(req,res)=>{

	function getUsers() {
	  return axios.get('http://localhost:3000/api/teachers');
	}
	
	function getAllGroups() {
	  return axios.get('http://localhost:3000/api/groups/all');
	}	
	function getAllSubjects() {
	  return axios.get('http://localhost:3000/api/subjects');
	}
	
	Promise.all([getUsers(), getAllGroups(), getAllSubjects()])
	  .then(function (results) {
	    const teachers = results[0].data;
	    const groups = results[1].data;
	    const subjects = results[2].data;
	    res.render('assignTeacher',{teachers: teachers, groups:groups, subjects:subjects})
	});

})

router.get('/assignGroups',(req,res)=>{
	function getUsers() {
	  return axios.get('http://localhost:3000/api/groups');
	}
	
	function getAllGroups() {
	  return axios.get('http://localhost:3000/api/groups/all');
	}
	
	Promise.all([getUsers(), getAllGroups()])
	  .then(function (results) {
	    const students = results[0].data;
	    const groups = results[1].data;
	    res.render('studentGroupAssignation',{students: students, groups:groups})
	});

})

router.get('/postulates',checkAuth(['student']),(req,res)=>{


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

router.get('/schedule',checkAuth(['student']),(req,res)=>{
    	res.render('schedule')
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
    		console.log(response.data);
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

		res.render('homeworkCreation')
})
//Exports for use in server.js
module.exports = router
