const express = require('express');
const addressRouter = express.Router();

const { getAllAddresses } = require('./addressController')
const { addNewAddress } = require('./addressController')
const {errorHandler} = require('../middlewares')

addressRouter.get('/', getAllAddresses)
addressRouter.post('/add', addNewAddress)
addressRouter.use(errorHandler)

module.exports = addressRouter