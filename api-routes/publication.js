const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const Publication = require('../models/publication')

const upload = multer({ dest: 'uploads/'})

router.post('/',upload.array('files', 4), async (req,res) => {
	console.log(req.body)	
	const publication = new Publication({
			title:req.body.title,
			content:req.body.content,
			class:req.body.class,
			assignation:req.body.assignation,
			date:req.body.date	
	})

	if(req.files){
		req.files.forEach(function(files,index){
			publication.files[index] = {data:fs.readFileSync(req.files[index].path)}	
		})
	}

	try{
		await publication.save()

		res.status(200).json(publication)

	}catch(err){
		
		res.json({ message : err })

	}

})

router.get('/', async (req,res) => {
	
	try{
		const publication = await Publication.find({class:req.body.publicationId},{files:0,content:0})


		res.status(200).json(publication)

	}catch(err){
		
		res.json({ message : err })

	}

})


router.get('/one', async (req,res) => {
	
	try{
		const onePublication = await Publication.findById(req.body.publicationId,{files:0})
		console.log(onePublication)
		res.status(200).json(onePublication)

	}catch(err){
		
		res.json({ message : err })

	}

})
module.exports = router
