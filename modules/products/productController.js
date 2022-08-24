const Product = require('./productModel')
const Model = require('../models/modelModel')
const Category = require('../categories/categoryModel')
const SubCategory = require('../sub categories/subCategoryModel')
const mongoose = require('mongoose')
const uuid = require('uuid');

const add = async(req,res,next)=>{
    try{
        let discountValue = Math.floor((req.body.discountPercentage / 100) * req.body.price)
        let netPrice = req.body.price - discountValue
        let product = new Product({...req.body, discountValue, netPrice, photos:[{id:uuid.v4(), src:req.body.photo}]})
        await product.save()
        res.send({
            message:'product added successfully',
            product
        })
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const update = async(req,res,next)=>{
    let id = req.params.id
    let data = req.body
    try{
        let discountValue = Math.floor((req.body.discountPercentage / 100) * req.body.price)
        let netPrice = req.body.price - discountValue
        let product = await Product.findByIdAndUpdate(id,{...data, discountValue, netPrice},{new:true}).populate('subCategory').populate('category')
        if(!product){
            throw new Error('no product found')
        }
        res.send({
            message:'product updated successfully',
            product
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const addPhoto = async(req,res,next)=>{
    let id = req.params.id
    try{
        let product = await Product.findByIdAndUpdate(
            id,
            {$push:{photos: {id:uuid.v4(),src:req.body.photo}}},
            {new:true}).populate('subCategory').populate('category')

        if(!product){
            throw new Error('no product found')
        }
        res.send({
            message:'photo added successfully successfully',
            product
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const removePhoto = async(req,res,next)=>{
    let id = req.params.id
    try{
        let product = await Product.findByIdAndUpdate(id,
            {$pull:{photos: {id:req.body.id}}},
            {new:true}).populate('subCategory').populate('category')
        if(!product){
            throw new Error('no product found')
        }
        res.send({
            message:'photo removed successfully successfully',
            product
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find().populate('subCategory').populate('category').populate('model')
        res.send({
            products
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const queryProductByName = async (req, res, next) => {
    try {
        let products = await Product.find({
            name: { $regex: `${req.params.name}`},
        }).populate('subCategory').populate('category').populate('model')

        res.send({
            products
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getProductById = async(req, res, next) => {
    try {
        let product = await Product.findById(req.params.id).populate('subCategory').populate('category').populate('model')
        res.send({
            product
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getProductsByCategoryName = async(req, res, next) => {
    let products = []
    try {
        const category = await Category.findOne({name:req.params.name})
        if(category) products = await Product.find({category:category._id}).populate('subCategory').populate('category').populate('model')
        res.send({
            products
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getProductsBySubCategoryName = async(req, res, next) => {
    let products = []
    try {
        const subCategory = await SubCategory.findOne({name:req.params.name})
        if(subCategory) products = await Product.find({subCategory:subCategory._id}).populate('subCategory').populate('category').populate('model')
        res.send({
            products
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getProductsByModelId = async(req, res, next) => {
    let id = req.params.id
    try {
        let model = await Model.findById(id)
        let products = await Product.find({model : id})
        if(!products) res.send({message:'not found'})
        res.send({
            products,
            model
        })
    }
    catch (error) {
        error.status = 404;
        next(error)
    }
}

const getProductByModelAndVariants = async(req, res, next) => {
    try {
        let products = await Product.aggregate([
            {
                $match: { model: mongoose.Types.ObjectId(req.body.model)}
            },
            {
                $match: {$and: [
                    {'variants.color': req.body.query.color },
                    { 'variants.size': req.body.query.size }
                ]} 
            }
        ])
        if(products.length === 0) {
            throw new Error('not found')
        }
        res.send({
            product:products[0]
        })
    }
    catch (error) {
        error.status = 404;
        next(error)
    }
}

const setSpecialCategory = async(req, res, next) => {
    try {
        let product = await Product.findByIdAndUpdate(
            req.body.id,
            {specialCategory:req.body.specialCategory},
            {new:true}
        )

        res.send({
            product
        })
    }
    catch (error) {
        error.status = 404;
        next(error)
    }
}

const getProductsBySpecialCategories = async(req, res, next) => {
    try {
        let products = await Product.find({specialCategory:req.params.specialCategory}).populate('subCategory').populate('category').populate('model')
        res.send({
            products
        })
    }
    catch (error) {
        error.status = 404;
        next(error)
    }
}

module.exports = {
    add,
    update,
    addPhoto,
    removePhoto,
    getAllProducts,
    queryProductByName,
    getProductById,
    getProductsByCategoryName,
    getProductsBySubCategoryName,
    getProductByModelAndVariants,
    getProductsByModelId,
    setSpecialCategory,
    getProductsBySpecialCategories
}