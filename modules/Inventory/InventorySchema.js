const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    color:String,
    photos:{
        type:[{
            src:String
        }],
    },
    sizes:{
        type:[{
            size:String,
            stock:Number
        }]
    }
})

module.exports = inventorySchema