const User = require('./userModel')
const bcrypt = require('bcrypt')
const util = require('util')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

//make jason web token functions async using util
const asyncLogInUser = util.promisify(jwt.sign);
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY

const signUp = async (req, res, next) => {
    let user = new User(req.body);  
    try {
        user.password = await bcrypt.hash(user.password, saltRounds)
        await user.save();
        res.send("signed up successfully");
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('invalid email or password');
        }
        const { password: hashedPassword } = user;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
        if (!checkPassword) {
            throw new Error('invalid email or password')
        }
        const token = await asyncLogInUser({
            id: user._id,
        }, secretKey)
        res.send({
            message: 'logged in successfully',
            token
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

const updateUserInfo = async (req, res, next) => {
    const { name, email, address } = req.body
    const {authorization} = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if(!payload){
            throw new Error('you have no permission');
        }
        let id = payload.id
        const user = await User.findOneAndUpdate(id,{name:name,email:email,address:address},{new:true});
        if (!user) {
            throw new Error('no user found');
        } 
        res.send({
            message:"updated successfuly",
            user
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

module.exports = {
    logIn,
    signUp,
    updateUserInfo
}