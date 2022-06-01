const express = require('express');
const userRouter = express.Router();
const { restrictToAdmin } = require('../auth')
const { logIn, signUp, updateUserInfo, getAllUsers, changeUserState, getUsersByName, addToFavorites, getFavorites } = require('./userController')
const errorHandler = require('../middlewares')

userRouter.post('/signUp', signUp)
userRouter.post('/logIn', logIn)
userRouter.put('/update', updateUserInfo)
userRouter.get('/', restrictToAdmin, getAllUsers)
userRouter.get('/search/:name', restrictToAdmin, getUsersByName)
userRouter.put('/toggleState/:id', restrictToAdmin, changeUserState)
userRouter.put('/', addToFavorites)
userRouter.get('/favorites', getFavorites)

userRouter.use(errorHandler)

module.exports = userRouter