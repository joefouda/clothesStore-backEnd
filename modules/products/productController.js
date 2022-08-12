const Product = require('./productModel')
const Model = require('../models/modelModel')
const Category = require('../categories/categoryModel')
const SubCategory = require('../sub categories/subCategoryModel')
const uuid = require('uuid');

const add = async(req,res,next)=>{
    try{
        let discountValue = Math.floor((req.body.discountPercentage / 100) * req.body.price)
        let product = new Product({...req.body, discountValue,photos:[{id:uuid.v4(),src:req.body.photo}]})
        await product.save()
        await Model.findByIdAndUpdate(
            req.body.model,
            {$push: { products:product._id}}
        )
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
        let product = await Product.findByIdAndUpdate(id,{...data, discountValue},{new:true}).populate('subCategory').populate('category')
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
        let products = await Product.find().populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })
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
        }).populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })

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
        let product = await Product.findById(req.params.id).populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })
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
        if(category) products = await Product.find({category:category._id}).populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })
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
        if(subCategory) products = await Product.find({subCategory:subCategory._id}).populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })
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

const getProductByModelAndSpecs = async(req, res, next) => {
    try {
        let products = await Product.find({model:req.body.model}).populate('subCategory').populate('category').populate({
            path:'model',
            populate:{
                path:'specs',
                model:'Spec'
            }
        })
        let product = products.find(product=>req.body.specs.every((ele,index)=>{
                return product.specs[index].value === ele.value
        }))
        if(!product) res.send({message:'notfound'})
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
    getProductByModelAndSpecs
}