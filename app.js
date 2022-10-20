const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const schedule = require("node-schedule")

require('dotenv').config({ path: 'config/.env' })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true},
	() => console.log('DB connected')
)

const routes = require('./api-routes/postulate-routes')

app.use('/postulate', routes)

const routesR = require('./api-routes/postulateRevision-routes')

app.use('/postulateRevision', routesR)

const routesL = require('./api-routes/login')

app.use('/login', routesL)

const routesGroupAssignation = require('./api-routes/studentGroupAssignation')

app.use('/groups', routesGroupAssignation)

const routesTimeAssignment = require('./api-routes/timeAssignment')

app.use('/timeAssignment', routesTimeAssignment)

const subjects = require('./api-routes/subjects')

app.use('/subjects', subjects)

const classrooms = require('./api-routes/classroom')

app.use('/classrooms', classrooms)

const publication = require('./api-routes/publication')

app.use('/publication', publication)

const assignments = require('./api-routes/assignments')

app.use('/assignment', assignments)



app.listen(3000)
