const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const https = require('https')
const fs = require('fs')

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

require('dotenv').config({ path: 'config/.env' })

const app = express()

 https.createServer({
	cert:fs.readFileSync('cert.pem'),
	key:fs.readFileSync('key.pem')
}, app).listen(3000)

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


//Videocall


const server = require('https').Server(app)
const io = require('socket.io')(server)

console.log(server)
io.on('connection', socket => {

	console.log("entro")
  socket.on('join-room', (roomId, userId) => {
	console.log("entro")
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})


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

const teachers = require('./api-routes/teachers')

app.use('/api/teachers', teachers)

const admin = require('./api-routes/admin')

app.use('/api/admin', admin)

const adminC = require('./api-routes/adminC')

app.use('/api/adminC', adminC)

const assignSchedule = require('./api-routes/assignSchedule')

app.use('/api/assignSchedule', assignSchedule)

const registerCount = require('./api-routes/addRegister')

app.use('/api/registerCount', registerCount)


const dropped = require('./api-routes/dropped')

app.use('/api/drop', dropped)


const ponderation = require('./api-routes/classroomPonderation')

app.use('/api/ponderation', ponderation)


const template = require('./api-routes/template')

app.use('/api/template', template)



