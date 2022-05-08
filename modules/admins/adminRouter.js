const express = require('express');
const adminRouter = express.Router();

const { logIn } = require('./adminController')
const { signUp } = require('./adminController')
const errorHandler = require('../middlewares')

adminRouter.post('/signUp', signUp)
adminRouter.post('/logIn', logIn)
adminRouter.use(errorHandler)

module.exports = adminRouter