const SubCategory = require('./subCategoryModel')
const Category = require('../categories/categoryModel')

const add = async (req, res, next) => {
    try {
        let subCategory = new SubCategory(req.body)
        await subCategory.save()

        res.send({
            message: 'subCategory added successfully',
            subCategory
        })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const update = async (req, res, next) => {
    let id = req.params.id
    try {
        let subCategory = await SubCategory.findByIdAndUpdate(id, {...req.body}, { new: true })
        res.send({
            message: 'subCategory updated successfully',
            subCategory
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getSubCategoryById = async (req, res, next) => {
    let id = req.params.id
    try {
        let subCategory = await SubCategory.findById(id)
        res.send({
            message: 'found',
            subCategory
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getSubCategoryByName = async (req, res, next) => {
    let name = req.params.name
    try {
        let subCategory = await SubCategory.findOne({ name })
        res.send({
            message: 'found',
            subCategory
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getSubCategoriesByCategoryId = async (req, res, next) => {
    let id = req.params.id
    try {
        let subCategories = await SubCategory.find({ category : id})
        res.send({
            subCategories
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

module.exports = {
    add,
    update,
    getSubCategoryById,
    getSubCategoryByName,
    getSubCategoriesByCategoryId
}