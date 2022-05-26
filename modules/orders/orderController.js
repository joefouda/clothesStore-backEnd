const Order = require('./orderModel')
const Cart = require('../carts/cartModel')
const util = require('util')
const jwt = require('jsonwebtoken') 
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY


const createOrder = async (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        let order = new Order({orderItems:cart.items})
        await order.save()
        res.send('Order created successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

const getAllOrders = async (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const orders = await Order.find()
        res.send({
            orders
        })
    } catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {
    createOrder,
    getAllOrders
}