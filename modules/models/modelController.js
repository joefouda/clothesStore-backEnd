const Model = require('./modelModel')
const SubCategory = require('../sub categories/subCategoryModel')
const Spec = require('../specs/specModel')

const add = async (req, res, next) => {
    try {
        let model = new Model({name:req.body.name, subCategory:req.body.subCategory, category:req.body.category})
        let specs = req.body.specs
        await model.save()

        await SubCategory.findOneAndUpdate(
            { _id: req.body.subCategory },
            { $push: { models: model._id } }
        )

        specs.forEach(async (ele,index)=>{
            let spec = new Spec(ele)
            await spec.save()

            if(index === specs.length -1){
                let finalmodel = await Model.findByIdAndUpdate(
                    model._id,
                    { $push: { specs: spec._id } },
                    {new:true}
                ).populate('specs');

                res.send({
                    message: 'model added successfully',
                    model:finalmodel
                })
            }else {
                await Model.findByIdAndUpdate(
                    model._id,
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
        let oldmodel = await Model.findById(id)
        oldmodel.specs.map(async ele=>{
            await Spec.findByIdAndRemove(ele)
        })
        await Model.findByIdAndUpdate(id, {...req.body,specs:[]}, { new: true })
        let specs = req.body.specs
        specs.forEach(async (ele, index)=>{
            let spec = new Spec(ele)
            await spec.save()
            if(index === specs.length -1){
                let finalmodel = await Model.findByIdAndUpdate(
                    id,
                    { $push: { specs: spec._id } },
                    {new:true}
                ).populate('specs');
                res.send({
                    message: 'model updated successfully',
                    model:finalmodel
                })
            }else {
                await Model.findByIdAndUpdate(
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

const getModelById = async (req, res, next) => {
    let id = req.params.id
    try {
        let model = await Model.findById(id).populate('products').populate('specs')
        res.send({
            model
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

module.exports = {
    add,
    update,
    getModelById
}