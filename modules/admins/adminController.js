const Admin = require('./adminModel')
const bcrypt = require('bcrypt')
const util = require('util')
const jwt = require('jsonwebtoken')
const saltRounds = 10;

//make jason web token functions async using util
const asyncLogInAdmin = util.promisify(jwt.sign);
// const asyncVerifyAdmin = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY

const signUp = async (req, res, next) => {
    let admin = new Admin(req.body);  
    try {
        admin.password = await bcrypt.hash(admin.password, saltRounds)
        await admin.save();
        res.send("signed up successfully");
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

const logIn = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const admin = await Admin.findOne({ userName: userName });
        if (!admin) {
            throw new Error('invalid username or password');
        }
        const { password: hashedPassword } = admin;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
        if (!checkPassword) {
            throw new Error('invalid username or password')
        }
        const token = await asyncLogInAdmin({
            id: admin._id,
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

module.exports = {
    logIn,
    signUp
}