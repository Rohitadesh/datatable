const express = require('express')
const route =express.Router()
const authentication= require('./middleware')
const{postUserData,postUserLogin,postUserDetails, postRefreshToken}= require('./controllers')

route.post('/register',postUserData)

route.post('/login',postUserLogin)

route.post('/refresh',postRefreshToken)

route.post('/data',authentication.authentication,postUserDetails)




module.exports =route