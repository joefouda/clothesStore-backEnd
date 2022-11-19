const Product = require('./productModel')
const Category = require('../categories/categoryModel')
const SubCategory = require('../sub categories/subCategoryModel')
// const mongoose = require('mongoose')
// const uuid = require('uuid');
const Inventory = require('../Inventory/InventoryModel')

const add = async(req,res,next)=>{
    try{
        let discountValue = Math.floor((req.body.discountPercentage / 100) * req.body.price)
        let netPrice = req.body.price - discountValue
        let product = new Product({...req.body, discountValue, netPrice})
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

const addColor = async(req,res,next)=>{
    try{
        let color = new Inventory({...req.body})

        await color.save()
        await Product.findByIdAndUpdate(
            req.body.productId,
            {$push: {colors: color._id}}
        )
        res.send({
            message:'color added successfully',
            color
        })
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const updateColor = async(req,res,next)=>{
    try{
        let color = await Inventory.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body
            },
            {new:true}
        )

        res.send({
            message:'color updated successfully',
            color
        })
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const getColorsByProductId = async(req,res,next)=>{
    try{
        let colors = await Inventory.find(
            {productId:req.params.id}
        )

        res.send({
            colors
        })
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const getColorById = async(req,res,next)=>{
    try{
        let color = await Inventory.findById(req.params.id)

        res.send({
            color
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
        let color = await Inventory.findByIdAndUpdate(
            id,
            {$push:{photos: {src:req.body.photo}}},
            {new:true})

        res.send({
            message:'photo added successfully successfully',
            color
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const removePhoto = async(req,res,next)=>{
    let id = req.params.id
    try{
        let color = await Inventory.findByIdAndUpdate(id,
            {$pull:{photos: {_id:req.body.photoId}}},
            {new:true})

        res.send({
            message:'photo removed successfully successfully',
            color
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find().populate('subCategory').populate('category').populate('colors')
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
        }).populate('subCategory').populate('category').populate('colors')
        
        // for(let i = 0; i < products.length;i++) {
        //     let color = await Inventory.findOne({productId:products[i]._id})
        //     products[i] = {...products[i], color}
        // }

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
        let product = await Product.findById(req.params.id).populate('subCategory').populate('category').populate('colors')
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
        if(category){
            products = await Product.find({category:category._id}).populate('subCategory').populate('category').populate('colors')
            // for(let i = 0; i < products.length;i++) {
            //     let color = await Inventory.findOne({productId:products[i]._id})
            //     products[i] = {...products[i], color}
            // }
        } 
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
        if(subCategory){
            products = await Product.find({subCategory:subCategory._id}).populate('subCategory').populate('category').populate('colors')
            // for(let i = 0; i < products.length;i++) {
            //     let color = await Inventory.findOne({productId:products[i]._id})
            //     products[i] = {...products[i], color}
            // }
        }
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

const getProductsBySubCategoryId = async(req, res, next) => {
    let products = []
    try {
        products = await Product.find({subCategory:req.params.id}).populate('subCategory').populate('category')
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

// const getProductByModelAndVariants = async(req, res, next) => {
//     try {
//         let products = await Product.aggregate([
//             {
//                 $match: { model: mongoose.Types.ObjectId(req.body.model)}
//             },
//             {
//                 $match: {$and: [
//                     {'variants.color': req.body.query.color },
//                     { 'variants.size': req.body.query.size }
//                 ]} 
//             }
//         ])
//         if(products.length === 0) {
//             throw new Error('not found')
//         }
//         res.send({
//             product:products[0]
//         })
//     }
//     catch (error) {
//         error.status = 404;
//         next(error)
//     }
// }

const setMainList = async(req, res, next) => {
    try {
        let product = await Product.findByIdAndUpdate(
            req.body.id,
            {mainList:req.body.mainList},
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

const getProductsByMainList = async(req, res, next) => {
    try {
        let products = await Product.find({mainList:req.params.mainList}).populate('subCategory').populate('category').populate('colors')

        // for(let i = 0; i < products.length;i++) {
        //     let color = await Inventory.findOne({productId:products[i]._id})
        //     products[i] = {...products[i], color}
        // }
        res.send({
            products,
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
    addColor,
    updateColor,
    getColorsByProductId,
    getColorById,
    removePhoto,
    getAllProducts,
    queryProductByName,
    getProductById,
    getProductsByCategoryName,
    getProductsBySubCategoryId,
    getProductsBySubCategoryName,
    // getProductByModelAndVariants,
    setMainList,
    getProductsByMainList
}