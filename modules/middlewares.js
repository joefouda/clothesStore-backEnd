const Admin = require('./admins/adminModel')
const User = require('./users/userModel')
const util = require('util')
const jwt = require('jsonwebtoken')

let secretKey = process.env.SECRET_KEY
const asyncVerify = util.promisify(jwt.verify);

const restrictToAdmin = async (req,res,next)=>{
    let {authorization} = req.headers
    try {
        let payload = await asyncVerify(authorization, secretKey)
        let admin = await Admin.findById(payload.id)
        if(!admin){
            throw new Error('you have no permission')
        }
        next()
    } catch (error) {
        error.status = 401
        next(error)
    }
}

const restrictToUser = async (req,res,next)=>{
    let {authorization} = req.headers
    try {
        let payload = await asyncVerify(authorization, secretKey)
        let user = await User.findById(payload.id)
        if(!user){
            throw new Error('you have no permission')
        }
        req.user = payload.id
        next()
    } catch (error) {
        error.status = 401
        next(error)
    }
}

const errorHandler = (err, req, res, next) => {
    res.send({
        status: err.status,
        message: err.message,
        errors: err.errors || []
    });
}


module.exports = {
    errorHandler,
    restrictToAdmin,
    restrictToUser
}
