const Order = require('./orderModel')
const User = require('../users/userModel')
const Product = require('../products/productModel')
const OrderItem = require('../orderItems/orderItemModel')
const Inventory = require('../Inventory/inventoryModel')

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

        req.body.orderItems.map(async orderItem=>{
            await Inventory.updateOne(
                {_id: orderItem.selectedColor, "sizes.size":orderItem.selectedSize},
                { $inc :{"sizes.stock" : -orderItem.quantity}}
            )
        })

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
            }).populate({
                path: 'orders',
                populate: {
                    path: 'orderItems',
                    model: 'OrderItem',
                    populate: {
                        path: 'selectedColor',
                        model: 'Inventory'
                    },
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
        }).populate({
            path: 'orderItems',
            populate: {
                path: 'selectedColor',
                model: 'Inventory'
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
        let order = await Order.findByIdAndUpdate(req.params.id, { state: 'canceled' }).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                model: 'Product'
            },
        }).populate({
            path: 'orderItems',
            populate: {
                path: 'selectedColor',
                model: 'Inventory'
            },
        })
        order.orderItems.map(async orderItem=>{
            await Product.findByIdAndUpdate(
                orderItem.product._id,
                { $inc :{stock : orderItem.quantity}}
            )
        })
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
        }).populate({
            path: 'orders',
            populate: {
                path: 'orderItems',
                model: 'OrderItem',
                populate: {
                    path: 'selectedColor',
                    model: 'Inventory'
                },
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

const getOrdersTotal = async(req, res, next) => {
    let orders = await Order.find({})
    let ordersTotal = orders.reduce((total, st)=> {
        return total + st.grandTotal
    }, 0)
    res.send({
        message: "orders total",
        ordersTotal
    })
}

const getMostSoldItem = async(req, res, next) => {
    let orders = await OrderItem.aggregate([
        {
            $group: {_id: '$product', totalOrders:{$sum:'$quantity'}}
        }
    ])

    let mostSold = orders.sort((a,b)=>a.quantity-b.quantity)[0]
    res.send({
        message: "most ordered product",
        mostSold
    })
}

module.exports = {
    createOrder,
    getAllOrders,
    changeOrderState,
    cancelOrder,
    getOrdersTotal,
    getMostSoldItem
}