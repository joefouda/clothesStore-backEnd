const SubCategory = require('./subCategoryModel')
const Category = require('../categories/categoryModel')
const Spec = require('../specs/specModel')
const add = async (req, res, next) => {
    try {
        let subCategory = new SubCategory({name:req.body.name,category:req.body.category})
        let specs = req.body.specs
        let category = await Category.findById(req.body.category)
        let subCategoryArray = category.subCategories
        await subCategory.save()
        subCategoryArray.push(subCategory._id)
        await Category.findOneAndUpdate(req.body.category,{ subCategories:subCategoryArray })

        specs.forEach(async ele=>{
            let spec = new Spec(ele)
            await spec.save()

            await SubCategory.findOneAndUpdate(
                { _id: subCategory._id },
                { $push: { specs: spec._id } }
            );
        })     
        
        res.send('subCategory added successfully')
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const update = async (req, res, next) => {
    let id = req.params.id
    let data = req.body
    try {
        let subCategory = await SubCategory.findByIdAndUpdate(id, data, { new: true })
        if (!subCategory) {
            throw new Error('no subCategory found')
        }
        await subCategory.save()
        res.send({
            message: 'subCategory updated successfully',
            subCategory
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

module.exports = {
    add,
    update
}