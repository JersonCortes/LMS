const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    	res.render('login')
})

router.get('/postulationForm',(req,res)=>{
    	res.render('postulation_form')
})

router.get('/postulates',(req,res)=>{
    	res.render('postulateTable')
})

router.get('/createAssignment',(req,res)=>{
    	res.render('homeworkCreation')
})


//Exports for use in server.js
module.exports = router
