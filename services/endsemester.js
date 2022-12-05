const schedule = require('node-schedule')

const setDates = (startFirstPartial,startSecondPartial, startThirdPartial, EndSemester)=>{

	schedule.scheduleJob(startSecondPartial,()=>{
		console.log("Funciona")
	})


	schedule.scheduleJob(startSecondPartial,()=>{
		console.log("Funciona")
	})

	schedule.scheduleJob(startThirdPartial,()=>{
		console.log("Funciona la segunda")
	})

	schedule.scheduleJob(EndSemester,()=>{
		console.log("Funciona la segunda")
	})
}

module.exports = setDates
