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

        specs.forEach(async (ele,index)=>{
            let spec = new Spec(ele)
            await spec.save()

            if(index === specs.length -1){
                let finalSubCategory = await SubCategory.findByIdAndUpdate(
                    subCategory._id,
                    { $push: { specs: spec._id } },
                    {new:true}
                ).populate('specs');

                res.send({
                    message: 'subCategory added successfully',
                    subCategory:finalSubCategory
                })
            }else {
                await SubCategory.findByIdAndUpdate(
                    subCategory._id,
                    { $push: { specs: spec._id } }
                );
            }
        })     
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
        await SubCategory.findByIdAndUpdate(id, {photo:req.body.photo, name:req.body.name, category:req.body.category, specs:[]}, { new: true })
        let specs = req.body.specs
        specs.forEach(async (ele, index)=>{
            let spec = new Spec(ele)
            await spec.save()
            if(index === specs.length -1){
                let finalSubCategory = await SubCategory.findByIdAndUpdate(
                    id,
                    { $push: { specs: spec._id } },
                    {new:true}
                ).populate('specs');
                res.send({
                    message: 'subCategory updated successfully',
                    subCategory:finalSubCategory
                })
            }else {
                await SubCategory.findByIdAndUpdate(
                    id,
                    { $push: { specs: spec._id } }
                );
            }
        })  
        
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getSubCategoryById = async (req, res, next) => {
    let id = req.params.id
    try {
        let subCategory = await SubCategory.findById(id).populate('specs')
        res.send({
            message:'found',
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
        let subCategory = await SubCategory.findOne({name}).populate('specs')
        res.send({
            message:'found',
            subCategory
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
    getSubCategoryByName
}