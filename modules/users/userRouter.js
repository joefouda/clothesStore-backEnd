const express = require('express');
const userRouter = express.Router();
const { restrictToAdmin } = require('../auth')
const { logIn, signUp, updateUserInfo, getAllUsers, changeUserState, getUsersByName, addToFavorites, removeFromFavorites, getFavorites } = require('./userController')
const errorHandler = require('../middlewares')

userRouter.post('/signup', signUp)
userRouter.post('/login', logIn)
userRouter.put('/update', updateUserInfo)
userRouter.get('/', restrictToAdmin, getAllUsers)
userRouter.get('/search/:name', restrictToAdmin, getUsersByName)
userRouter.put('/togglestate/:id', restrictToAdmin, changeUserState)
userRouter.put('/', addToFavorites)
userRouter.put('/remove', removeFromFavorites)
userRouter.get('/favorites', getFavorites)

userRouter.use(errorHandler)

module.exports = userRouter