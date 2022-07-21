const Cart = require('./cartModel')
const OrderItem = require('../orderItems/orderItemModel')
const User = require('../users/userModel')
const util = require('util')
const jwt = require('jsonwebtoken')
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY

const addToCart = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let responseCart = await Cart.findById(user.cart).populate('items').populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'category',
                    model:'Category'
                }
            }
        }).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'subCategory',
                    model:'SubCategory'
                },
            }
        })
        if (responseCart.items.length !== 0 && responseCart.items.some(ele=>ele.product._id == req.body.product._id)){
            res.send({ cart: responseCart.items, message: 'item already exists' })
        } else {
            let orderItem = new OrderItem({ ...req.body })
            await orderItem.save()
            let cart = await Cart.findOneAndUpdate(
                { _id: user.cart },
                { $push: { items: orderItem._id } },
                {new:true}
            ).populate('items').populate({
                path: 'items',
                populate: {
                    path: 'product',
                    populate:{
                        path:'category',
                        model:'Category'
                    }
                }
            }).populate({
                path: 'items',
                populate: {
                    path: 'product',
                    populate:{
                        path:'subCategory',
                        model:'SubCategory'
                    },
                }
            })
            res.send({ cart: cart.items, message: 'item added successfully' })
        }

    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const removeFromCart = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)

        await OrderItem.findByIdAndRemove(req.params.id)
        await Cart.findOneAndUpdate(
            { _id: user.cart },
            { $pull: { items: req.params.id } }
        );
        let cart = await Cart.findById(user.cart).populate('items').populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'category',
                    model:'Category'
                }
            }
        }).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'subCategory',
                    model:'SubCategory'
                },
            }
        })
        res.send({ cart: cart.items, message: 'item removed successfully' })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const emptyCart = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cart)
        cart.items.map(async ele => {
            await OrderItem.findByIdAndRemove(ele)
        })
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { items: [] }
        );

        await cart.save()
        res.send('Cart unloaded successfully')
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const getCart = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cart).populate('items').populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'category',
                    model:'Category'
                }
            }
        }).populate({
            path: 'items',
            populate: {
                path: 'product',
                populate:{
                    path:'subCategory',
                    model:'SubCategory'
                },
            }
        })
        res.send({ cart: cart.items })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

module.exports = {
    addToCart,
    emptyCart,
    removeFromCart,
    getCart
}