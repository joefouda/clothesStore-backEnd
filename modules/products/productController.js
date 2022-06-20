const Product = require('./productModel')
const SubCategory = require('../sub categories/subCategoryModel')
const Category = require('../categories/categoryModel')
const uuid = require('uuid');

const add = async(req,res,next)=>{
    try{
        let uniqueId = uuid.v4()
        let product = new Product({...req.body,model:req.body.model?req.body.model:uniqueId})
        let subCategory = await SubCategory.findById(req.body.subCategory)
        let productsArray = subCategory.products
        await product.save()
        productsArray.push(product._id)
        if(req.body.model){
            await SubCategory.findByIdAndUpdate(req.body.subCategory,{products:productsArray})
        }
        await SubCategory.findByIdAndUpdate(req.body.subCategory,{products:productsArray,$push: { models: uniqueId }})
        res.send('product added successfully')
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const update = async(req,res,next)=>{
    let id = req.params.id
    let data = req.body
    try{
        let product = await Product.findByIdAndUpdate(id,data,{new:true})
        if(!product){
            throw new Error('no product found')
        }
        await product.save()
        res.send({
            message:'product updated successfully',
            product
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find()
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

const getProductsByCategoryName = async(req, res, next) => {
    try {
        const category = await Category.findOne({name:req.params.name})
        let products = await Product.find({category:category._id})
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

module.exports = {
    add,
    update,
    getAllProducts,
    getProductsByCategoryName
}