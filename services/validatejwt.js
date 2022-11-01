const jwt = require('jsonwebtoken')

require('dotenv').config({ path: 'config/.env' })

login = async (password,hash, user)=>{
	return new Promise((resolve,reject)=>{

		jwt.verify(token,proccess.env.JWT_KEY)
	})
}

module.exports = login
