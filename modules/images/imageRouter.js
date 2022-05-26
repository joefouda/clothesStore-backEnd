const express = require('express')
const imageRouter = express.Router();
const { uploadImage, upload } = require('./imageController')



imageRouter.post('/', upload.single('image'), uploadImage);

module.exports = imageRouter