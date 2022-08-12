const express = require('express');
const dummyRouter = express.Router();

const { postNew, getData } = require('./dummyController')
const {errorHandler} = require('../middlewares')

dummyRouter.post('/', postNew)
dummyRouter.get('/', getData)
dummyRouter.use(errorHandler)

module.exports = dummyRouter