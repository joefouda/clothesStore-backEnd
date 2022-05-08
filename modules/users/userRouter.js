const express = require('express');
const userRouter = express.Router();

const { logIn } = require('./userController')
const { signUp } = require('./userController')
const { updateUserInfo } = require('./userController')

const errorHandler = require('../middlewares')

userRouter.post('/signUp', signUp)
userRouter.post('/logIn', logIn)
userRouter.put('/update', updateUserInfo)
userRouter.use(errorHandler)

module.exports = userRouter