const Model = require('./modelModel')

const add = async (req, res, next) => {
    try {
        let model = new Model(req.body)
        await model.save()

        res.send({
            message: 'model added successfully',
            model
        })
    } catch (error) {
        error.status = 422;
        next(error)
    }
}

const update = async (req, res, next) => {
    let id = req.params.id
    try {
        let model = await Model.findByIdAndUpdate(id, req.body, { new: true })
        res.send({
            message: 'model updated successfully',
            model
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getModelById = async (req, res, next) => {
    let id = req.params.id
    try {
        let model = await Model.findById(id).populate('products')
        res.send({
            model
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

const getModelsBySubCategoryId = async (req, res, next) => {
    let id = req.params.id
    try {
        let models = await Model.find({subCategory: id})
        res.send({
            models
        })
    } catch (error) {
        error.status = 404;
        next(error)
    }
}

module.exports = {
    add,
    update,
    getModelsBySubCategoryId,
    getModelById
}