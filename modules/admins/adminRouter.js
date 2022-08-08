const express = require('express');
const adminRouter = express.Router();

const { logIn } = require('./adminController')
const { signUp } = require('./adminController')
const {errorHandler} = require('../middlewares')

adminRouter.post('/signup', signUp)
adminRouter.post('/login', logIn)
adminRouter.use(errorHandler)

module.exports = adminRouter