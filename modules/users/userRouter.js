const express = require('express');
const userRouter = express.Router();
const { restrictToAdmin } = require('../auth')
const { logIn } = require('./userController')
const { signUp } = require('./userController')
const { updateUserInfo } = require('./userController')
const { getAllUsers } = require('./userController')
const { changeUserState } = require('./userController')
const { getUsersByName } = require('./userController')
const errorHandler = require('../middlewares')

userRouter.post('/signUp', signUp)
userRouter.post('/logIn', logIn)
userRouter.put('/update', updateUserInfo)
userRouter.get('/', restrictToAdmin, getAllUsers)
userRouter.get('/:name', restrictToAdmin, getUsersByName)
userRouter.put('/toggleState/:id', restrictToAdmin, changeUserState)

userRouter.use(errorHandler)

module.exports = userRouter