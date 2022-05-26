const Admin = require('./admins/adminModel')
const util = require('util')
const jwt = require('jsonwebtoken')

let secretKey = process.env.SECRET_KEY
const asyncVerifyAdmin = util.promisify(jwt.verify);

const restrictToAdmin = async (req,res,next)=>{
    let {authorization} = req.headers
    try {
        let payload = await asyncVerifyAdmin(authorization, secretKey)
        let admin = await Admin.findById(payload.id)
        if(!admin){
            throw new Error('you are not authorized')
        }
        next()
    } catch (error) {
        error.status = 401
        next(error)
    }
}

module.exports = {
    restrictToAdmin
}