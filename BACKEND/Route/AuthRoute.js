const express=require('express')
const { RegisterUser,LoginUser,LogoutUser,checkAUth } = require('../Controller/AuthController')
const {Authentication}=require('../Middleware/AuthMiddleware')
const AuthRoute =express.Router()


AuthRoute.post('/login',LoginUser)
AuthRoute.post('/register',RegisterUser)
AuthRoute.post('/logout',LogoutUser)
AuthRoute.get('/checkAuth',Authentication,checkAUth)


module.exports=AuthRoute