const express = require('express')
const mainListRouter = express.Router()
const { editMainListPhoto, editMainListVisability, getMainLists, editMainListDisplayedName, getMainListDisplayedName } = require('./mainListsController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

mainListRouter.get('/',getMainLists)
mainListRouter.get('/displayedTitle/:title',getMainListDisplayedName)
mainListRouter.put('/:title',restrictToAdmin,editMainListPhoto)
mainListRouter.put('/visable/:title',restrictToAdmin,editMainListVisability)
mainListRouter.patch('/displayedTitle/:title',restrictToAdmin,editMainListDisplayedName)
mainListRouter.use(errorHandler)

module.exports = mainListRouter