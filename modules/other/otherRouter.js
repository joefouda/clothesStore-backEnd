const express = require('express')
const otherRouter = express.Router()
const {add, getMainSliderPhotos, deletePhoto} = require('./otherController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

otherRouter.put('/:name',restrictToAdmin,add)
otherRouter.delete('/:name/:id',restrictToAdmin,deletePhoto)
otherRouter.get('/:name',getMainSliderPhotos)
otherRouter.use(errorHandler)

module.exports = otherRouter