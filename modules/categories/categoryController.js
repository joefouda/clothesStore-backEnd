const Category = require('./categoryModel')

const add = async(req,res,next)=>{
    try{
        let category = new Category(req.body)
        if(!category){
            throw new Error('invalid data')
        }
        await category.save()
        res.send('category added successfully')
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const update = async(req,res,next)=>{
    let data = req.body
    try{
        let category = await Category.findByIdAndUpdate(req.params.id,data,{new:true})
        if(!category){
            throw new Error('no category found')
        }
        await category.save()
        res.send({
            message:'category updated successfully',
            category
        })
    }catch(error){
        error.status = 404;
        next(error)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        let categories = await Category.find().populate('subCategories').populate({
            path: 'subCategories',
            populate: {
              path: 'specs',
              model: 'Spec',
            }
          })
        res.send({
            categories
        })
    }
    catch (error) {
        error.status = 500;
        error.message = "internal server error";
        next(error)
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id).populate('subCategories').populate({
            path: 'subCategories',
            populate: {
              path: 'specs',
              model: 'Spec',
            }
          })
        res.send({
            category
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
    getAllCategories,
    getCategoryById
}