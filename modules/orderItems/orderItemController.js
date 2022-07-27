const OrderItem = require('./orderItemModel')


const editQuantity = async(req,res,next)=>{
    try{
        let orderItem = await OrderItem.findByIdAndUpdate(req.body.orderItemID,{
            quantity:req.body.quantity,
            orderPrice:req.body.orderPrice
        },{new:true}).populate('product').populate({
            path:'product',
            populate: {
                path:'category',
                model:'Category'
            }
        }).populate({
            path:'product',
            populate: {
                path:'subCategory',
                model:'SubCategory'
            }
        })
        res.send({orderItem, message:'category added successfully'})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {
    editQuantity
}