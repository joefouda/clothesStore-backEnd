const Order = require('./orderModel')
const User = require('../users/userModel')

const createOrder = async (req, res, next) => {
    try {
        let order = new Order({ ...req.body, user: req.user })
        await order.save()
        let orderedDate = new Date(Date.parse(order.dateOrdered))
        let arrivingDate = new Date(Date.parse(order.dateOrdered))
        arrivingDate.setDate(orderedDate.getDate() + 3)
        await Order.findByIdAndUpdate(
            order._id,
            {arrivingDate:arrivingDate}
        )

        let newUser = await User.findByIdAndUpdate(
            req.user,
            { $push: { orders: order._id } },
            { new: true }).populate('orders').populate({
                path: 'orders',
                populate: {
                    path: 'orderItems',
                    model: 'OrderItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        }
                    }
                }
            }).populate({
                path: 'orders',
                populate: {
                    path: 'orderItems',
                    model: 'OrderItem',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        populate: {
                            path: 'category',
                            model: 'Category'
                        },
                        populate: {
                            path: 'subCategory',
                            model: 'SubCategory'
                        }
                    }
                }
            }).populate({
                path: 'orders',
                populate: {
                    path: 'user',
                    model: 'User',
                }
            })

        res.send({ user: newUser, message: 'Order created successfully' })

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
        }).populate('user')

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
        if(req.body.state === 'delivered'){
            let arrivingDate = new Date
            await Order.findByIdAndUpdate(req.body.id, { state: req.body.state, arrivingDate:arrivingDate })
        } else {
            await Order.findByIdAndUpdate(req.body.id, { state: req.body.state})
        }
        res.send(`Order State Changed to ${req.body.state} Successfully`)
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { state: 'canceled' })
        let user = await User.findById(req.user).populate('orders').populate({
            path: 'orders',
            populate: {
                path: 'orderItems',
                model: 'OrderItem',
                populate: {
                    path: 'product',
                    model: 'Product',
                    populate: {
                        path: 'category',
                        model: 'Category'
                    }
                }
            }
        }).populate({
            path: 'orders',
            populate: {
                path: 'orderItems',
                model: 'OrderItem',
                populate: {
                    path: 'product',
                    model: 'Product',
                    populate: {
                        path: 'category',
                        model: 'Category'
                    },
                    populate: {
                        path: 'subCategory',
                        model: 'SubCategory'
                    }
                }
            }
        }).populate({
            path: 'orders',
            populate: {
                path: 'user',
                model: 'User',
            }
        })

        res.send({
            messgae: `Order Canceled successfully`,
            user
        })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    changeOrderState,
    cancelOrder
}