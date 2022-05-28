const Order = require('./orderModel')
const Cart = require('../carts/cartModel')
const OrderItem = require('../orderItems/orderItemModel')
const User = require('../users/userModel')
const util = require('util')
const jwt = require('jsonwebtoken')
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY


const createOrder = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let cart = await Cart.findById(user.cartId)
        let order = new Order({ ...req.body, orderItems: cart.items, User: payload.id })
        await order.save()

        let totalPrice = 0
        cart.items.map(async ele => {
            let orderItem = await OrderItem.findById(ele)
            totalPrice += orderItem.orderPrice
            await Order.findOneAndUpdate(
                { _id: order._id },
                { totalPrice }
            );
        })
        res.send('Order created successfully')
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const getAllOrders = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const orders = await Order.find().populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: {
                    path: 'category',
                    model: 'Category'
                },
            },
        }).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: {
                    path: 'subCategory',
                    model: 'SubCategory'
                },
            },
        }).populate('User')

        res.send({
            orders
        })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const changeOrderState = async (req, res, next) => {
    try {
        await Order.findByIdAndUpdate(req.body.id,{state:req.body.state})

        res.send(`Order State Changed to ${req.body.state} Successfully`)
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    changeOrderState
}