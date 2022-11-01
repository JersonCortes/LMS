const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

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

app.set('view engine', 'ejs')

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))

//routes
const routes = require('./api-routes/postulate-routes')

app.use('/api/postulate', routes)

const routesR = require('./api-routes/postulateRevision-routes')

app.use('/api/postulateRevision', routesR)

const routesL = require('./api-routes/login')

app.use('/api/login', routesL)

const routesGroupAssignation = require('./api-routes/studentGroupAssignation')

app.use('/api/groups', routesGroupAssignation)

const routesTimeAssignment = require('./api-routes/timeAssignment')

app.use('/api/timeAssignment', routesTimeAssignment)

const subjects = require('./api-routes/subjects')

app.use('/api/subjects', subjects)

const classrooms = require('./api-routes/classroom')

app.use('/api/classrooms', classrooms)

const publication = require('./api-routes/publication')

app.use('/api/publication', publication)

const assignments = require('./api-routes/assignments')

app.use('/api/assignment', assignments)


const frontend = require('./frontend-routes/frontend-routes')

app.use('/', frontend)



app.listen(3000)
