const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/',(req,res)=>{
    	res.render('login')
})

router.get('/postulationForm',(req,res)=>{
    	res.render('postulation_form')
})

router.get('/postulates',(req,res)=>{


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

router.get('/createAssignment',(req,res)=>{
    	res.render('homeworkCreation')
})


//Exports for use in server.js
module.exports = router
