const express = require('express')
const router = express.Router()
const axios = require('axios')
const checkAuth = require('../services/auth')

router.get('/',(req,res)=>{
    	res.render('login')
})

router.get('/postulationForm',(req,res)=>{
    	res.render('postulation_form')
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

router.get('/schedule',(req,res)=>{
    	res.render('schedule')
})

router.get('/subjects',(req,res)=>{
 
	let url = "http://localhost:3000/api/classrooms"

	axios.get(url, {
    		params: {
    		}
  	})
	.then(function (response) {
    		console.log(response.data);
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
    		params: {
    		}
  	})
	.then(function (response) {
    		console.log(response.data);
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

//Exports for use in server.js
module.exports = router
