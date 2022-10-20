const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const Publication = require('../models/publication')

const upload = multer({ dest: 'uploads/'})

router.post('/',upload.array('files', 4), async (req,res) => {
	
	const publication = new Publication({
			title:req.body.title,
			content:req.body.content,
			class:req.body.class,
			assignation:req.body.assignation,
			date:req.body.date,
			files:{
				data:fs.readFileSync(req.files[0].path),
			}
	})

	console.log(req.files[0].filename)
	try{
		await publication.save()

		res.status(200).json(publication)

	}catch(err){
		
		res.json({ message : err })

	}

})

module.exports = router
