const User = require('./userModel')
const Cart = require('../carts/cartModel')
const bcrypt = require('bcrypt')
const util = require('util')
const jwt = require('jsonwebtoken')
const { response } = require('express')
const saltRounds = 10;

//make jason web token functions async using util
const asyncLogInUser = util.promisify(jwt.sign);
const asyncVerifyUser = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY

const signUp = async (req, res, next) => {
    let user = new User(req.body);
    try {
        let cart = new Cart({ items: [] })
        await cart.save()
        user.password = await bcrypt.hash(user.password, saltRounds)
        user.cart = cart._id
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
        const user = await User.findOne({ email: email }).populate('cart');
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
            token,
            cart:user.cart.items
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

const updateUserInfo = async (req, res, next) => {
    const { name, email, address } = req.body
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let id = payload.id
        const user = await User.findOneAndUpdate(id, { name: name, email: email, address: address }, { new: true });
        if (!user) {
            throw new Error('no user found');
        }
        res.send({
            message: "updated successfuly",
            user
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find()
        res.send({
            users
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getUsersByName = async (req, res, next) => {
    try {
        let users = await User.find({
            name: { $regex: `${req.params.name}`, $options: 'i' },
        })
        res.send({
            message: users.length ? 'success' : 'no users found',
            users
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const changeUserState = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        await User.findByIdAndUpdate(req.params.id, { isBanned: user.isBanned ? false : true })
        res.send({
            message: `User ${user.isBanned ? 'activated successfully' : 'Banned Successfully'}`
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const addToFavorites = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let user = await User.findById(payload.id)
        let responseUser = await User.findById(payload.id).populate('favorites');
        if (user.favorites.includes(req.body.productId)) res.send({user:responseUser, message: `Product Already exists` })
        else {
            let newUser = await User.findByIdAndUpdate(
                payload.id,
                { $push: { favorites: req.body.productId } },
                { new: true }
            ).populate('favorites');

            res.send({
                user: newUser,
                message: `Product Added to Favorites Successfully`
            })
        }
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const removeFromFavorites = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        let newUser = await User.findByIdAndUpdate(
            payload.id,
            { $pull: { favorites: req.body.productId } },
            { new: true }
        ).populate('favorites');

        res.send({
            user: newUser,
            message: `Product Removed from Favorites Successfully`
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getFavorites = async (req, res, next) => {
    const { authorization } = req.headers
    try {
        const payload = await asyncVerifyUser(authorization, secretKey)
        if (!payload) {
            throw new Error('you have no permission');
        }
        const user = await User.findById(payload.id).populate('favorites');
        res.send({
            favorites: user.favorites
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

module.exports = {
    logIn,
    signUp,
    updateUserInfo,
    getAllUsers,
    getUsersByName,
    changeUserState,
    addToFavorites,
    removeFromFavorites,
    getFavorites
}