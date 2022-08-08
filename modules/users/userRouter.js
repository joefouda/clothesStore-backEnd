const express = require('express');
const userRouter = express.Router();
const { logIn, signUp, updateUserInfo, getAllUsers, changeUserState, getUsersByName, addToFavorites, removeFromFavorites, getFavorites } = require('./userController')
const {errorHandler, restrictToAdmin, restrictToUser} = require('../middlewares')

userRouter.post('/signup', signUp)
userRouter.post('/login', logIn)
userRouter.put('/update',restrictToUser, updateUserInfo)
userRouter.get('/', restrictToAdmin, getAllUsers)
userRouter.get('/search/:name', restrictToAdmin, getUsersByName)
userRouter.put('/togglestate/:id', restrictToAdmin, changeUserState)
userRouter.put('/', restrictToUser, addToFavorites)
userRouter.put('/remove', restrictToUser, removeFromFavorites)
userRouter.get('/favorites', restrictToUser, getFavorites)

userRouter.use(errorHandler)

module.exports = userRouter