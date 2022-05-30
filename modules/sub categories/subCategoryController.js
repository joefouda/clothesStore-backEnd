const SubCategory = require('./subCategoryModel')
const Category = require('../categories/categoryModel')
const Spec = require('../specs/specModel')

const add = async (req, res, next) => {
    try {
        let subCategory = new SubCategory({photo:req.body.photo, name:req.body.name, category:req.body.category})
        let specs = req.body.specs
        await subCategory.save()

        await Category.findOneAndUpdate(
            { _id: req.body.category },
            { $push: { subCategories: subCategory._id } }
        )

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

            await SubCategory.findByIdAndUpdate(
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