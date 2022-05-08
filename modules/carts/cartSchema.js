const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    items: [
      { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
      },
    ],
})

module.exports = cartSchema