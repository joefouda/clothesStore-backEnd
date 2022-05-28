const SubCategory = require('./subCategoryModel')
const Category = require('../categories/categoryModel')
const Spec = require('../specs/specModel')

const add = async (req, res, next) => {
    try {
        let subCategory = new SubCategory({photo:req.body.photo, name:req.body.name, category:req.body.category})
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
    try {
        let oldSubCategory = await SubCategory.findById(id)
        oldSubCategory.specs.map(async ele=>{
            await Spec.findByIdAndRemove(ele)
        })
        let subCategory = await SubCategory.findByIdAndUpdate(id, {photo:req.body.photo, name:req.body.name, category:req.body.category, specs:[]}, { new: true })
        let specs = req.body.specs
        specs.forEach(async ele=>{
            let spec = new Spec(ele)
            await spec.save()

            await SubCategory.findOneAndUpdate(
                id,
                { $push: { specs: spec._id } }
            );
        })   
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