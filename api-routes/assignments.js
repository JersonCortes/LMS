const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const Assignment = require('../models/assignment')

const upload = multer({ dest: 'uploads/'})

router.post('/',upload.array('files', 4), async (req,res) => {
	
	const assignment = new Assignment({
			register:req.body.register,
			class:req.body.class,
			date:req.body.date
	})

	if(req.files){
		req.files.forEach(function(files,index){
			assignment.files[index] = {data:fs.readFileSync(req.files[index].path)}	
		})
	}
	try{
		await assignment.save()

		res.status(200).json(assignment)

	}catch(err){
		
		res.json({ message : err })

	}
})

module.exports = router
