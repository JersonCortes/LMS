const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const Assignment = require('../models/assignment')

const upload = multer({ dest: 'uploads/'})

router.post('/',upload.array('files', 4), async (req,res) => {
	if(req.files==null){console.log("entro")}
	const assignment = new Assignment({
			register:req.body.register,
			class:req.body.class,
			date:req.body.date,
			files:{
				data:fs.readFileSync(req.files[0].path),
			}
	})

	try{
		await publication.save()

		res.status(200).json(assignment)

	}catch(err){
		
		res.json({ message : err })

	}

})

module.exports = router
