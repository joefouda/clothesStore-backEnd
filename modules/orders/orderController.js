const Order = require('./orderModel')
const User = require('../users/userModel')
const util = require('util')
const jwt = require('jsonwebtoken')
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY


const createOrder = async (req, res, next) => {
    try {
        let order = new Order({ ...req.body, user: req.user })
        await order.save()

        let newUser = await User.findByIdAndUpdate(
            req.user,
            { $push: { orders: order._id } },
            { new: true }).populate('orders').populate({
                path:'orders',
                populate:{
                    path:'orderItems',
                    model:'OrderItem',
                    populate:{
                        path:'product',
                        model:'Product',
                        populate:{
                            path:'category',
                            model:'Category'
                        }
                    }
                }
            }).populate({
                path:'orders',
                populate:{
                    path:'orderItems',
                    model:'OrderItem',
                    populate:{
                        path:'product',
                        model:'Product',
                        populate:{
                            path:'category',
                            model:'Category'
                        },
                        populate:{
                            path:'subCategory',
                            model:'SubCategory'
                        }
                    }
                }
            }).populate({
                path:'orders',
                populate:{
                    path:'user',
                    model:'User',
                }
            })

        res.send({ user:newUser, message: 'Order created successfully' })

    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const getAllOrders = async (req, res, next) => {
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
        await Order.findByIdAndUpdate(req.body.id, { state: req.body.state })

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