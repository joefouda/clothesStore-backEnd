const Cart = require('./cartModel')
const OrderItem = require('../order Items/orderItemModel')
const User = require('../users/userModel')
const Product = require('../products/productModel')
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY


const fillCart = (req,res,next)=>{
    let items = req.items
    let finalItems = []
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        items.map(ele=>{
            let product = await Product.findById(ele.product)
            let orderItem = new OrderItem({...ele,orderPrice:ele.quantity*product.price})
            await orderItem.save()
            finalItems.push(orderItem._id)
        })
        let cart = new Cart({items:finalItems})
        await cart.save()
        await User.findByIdAndUpdate(payload.id,{cartId:cart._id})
        res.send('Cart filled successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}
const addToCart = (req,res,next)=>{
    const {authorization} = req.headers
    try{
        let product = await Product.findById(req.orderItem.product)
        let orderItem = new OrderItem({...req.orderItem,orderPrice:req.orderItem.quantity*product.price})
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        await orderItem.save()
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        cart.items.push(orderItem._id)
        await cart.save()
        res.send('item added successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

const removeFromCart = (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        await OrderItem.findByIdAndRemove(req.params.id)
        cart.items.filter(ele=>{
            return ele !== req.params.id
        })
        await cart.save()
        res.send('item removed successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

const emptyCart = (req,res,next)=>{
    const {authorization} = req.headers
    try{
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        cart.items.map(ele=>{
            await OrderItem.findByIdAndRemove(ele)
        })
        cart.items = []
        await cart.save()
        res.send('Cart unloaded successfully')
    } catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {
    fillCart,
    addToCart,
    emptyCart,
    removeFromCart
}