const Product = require('./productModel')
const SubCategory = require('../sub categories/subCategoryModel')
const Category = require('../categories/categoryModel')
const uuid = require('uuid');

const add = async(req,res,next)=>{
    try{
        let uniqueId = uuid.v4()
        let product = new Product({...req.body,model:req.body.model !== 'new'?req.body.model:uniqueId})
        let subCategory = await SubCategory.findById(req.body.subCategory)
        let productsArray = subCategory.products
        await product.save()
        productsArray.push(product._id)
        if(req.body.model !== 'new'){
            await SubCategory.findByIdAndUpdate(req.body.subCategory,{products:productsArray})
        }else{
            await SubCategory.findByIdAndUpdate(req.body.subCategory,{products:productsArray,$push: { models: uniqueId }})
        }
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
        let product = await Product.findByIdAndUpdate(id,data,{new:true}).populate('subCategory').populate('category')
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

const getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find().populate('subCategory').populate('category')
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
        let product = await Product.findById(req.params.id).populate('subCategory').populate('category')
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
        if(category) products = await Product.find({category:category._id}).populate('subCategory').populate('category')
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
        if(subCategory) products = await Product.find({subCategory:subCategory._id}).populate('subCategory').populate('category')
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

const getProductsByModel = async(req, res, next) => {
    try {
        let products = await Product.find({model:req.params.model}).populate('subCategory').populate('category')
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
        let products = await Product.find({model:req.body.model}).populate('subCategory').populate('category')
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
    getAllProducts,
    getProductById,
    getProductsByCategoryName,
    getProductsBySubCategoryName,
    getProductsByModel,
    getProductByModelAndSpecs
}