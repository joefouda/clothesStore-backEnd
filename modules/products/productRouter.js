const express = require('express')
const productRouter = express.Router()
const {
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
    getProductsByCategoryName,
    getProductsBySubCategoryId,
    getProductsBySubCategoryName,
    getProductById,
    // getProductByModelAndVariants,
    setMainList,
    getProductsByMainList
} = require('./productController')
const {errorHandler, restrictToAdmin} = require('../middlewares')

productRouter.post('/add',restrictToAdmin,add)
productRouter.put('/update/:id',restrictToAdmin,update)
productRouter.put('/color/add/:id',restrictToAdmin,addPhoto)
productRouter.put('/color/remove/:id',restrictToAdmin,removePhoto)
productRouter.post('/addColor',restrictToAdmin,addColor)
productRouter.put('/updateColor/:id',restrictToAdmin,updateColor)
productRouter.get('/colors/:id',getColorsByProductId)
productRouter.get('/color/:id',getColorById)
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getProductById)
productRouter.get('/search/:name',queryProductByName)
productRouter.get('/category/:name',getProductsByCategoryName)
productRouter.get('/subCategory/:name',getProductsBySubCategoryName)
productRouter.get('/subCategoryId/:id',getProductsBySubCategoryId)
// productRouter.put('/variants',getProductByModelAndVariants)
productRouter.put('/mainList',restrictToAdmin,setMainList)
productRouter.get('/mainList/:mainList',getProductsByMainList)


productRouter.use(errorHandler)


module.exports = productRouter

