const Cart = require('./cartModel')
const OrderItem = require('../orderItems/orderItemModel')
const User = require('../users/userModel')
const Product = require('../products/productModel')
const util = require('util')
const jwt = require('jsonwebtoken')
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY

const addToCart = async (req,res,next)=>{
    const {authorization} = req.headers
    try{
        let product = await Product.findById(req.body.product)
        let orderItem = new OrderItem({...req.body,orderPrice:req.body.quantity*product.price})
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        await orderItem.save()
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $push: { items: orderItem._id } }
        );
        await cart.save()
        res.send('item added successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

const removeFromCart = async (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        await OrderItem.findByIdAndRemove(req.params.id)
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $pull: { items: req.params.id } }
        );
        await cart.save()
        res.send('item removed successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

const emptyCart = async (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        cart.items.map(async ele=>{
            await OrderItem.findByIdAndRemove(ele)
        })
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            {  items: [] } 
        );
        
        await cart.save()
        res.send('Cart unloaded successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {  
    addToCart,
    emptyCart,
    removeFromCart
}