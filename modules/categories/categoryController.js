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
    let id = req.params.id
    let data = req.body
    try{
        let category = await Category.findByIdAndUpdate(id,data,{new:true})
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

module.exports = {
    add,
    update
}