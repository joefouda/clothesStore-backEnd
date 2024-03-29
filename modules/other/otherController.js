const Other = require('./otherModel')
const uuid = require('uuid')

const add = async(req,res,next)=>{
    try{
        let mainSlider = await Other.findOneAndUpdate(
            { name:req.params.name },
            { $push: { photos: {id:uuid.v4(), src:req.body.photo} } },
            {new:true}
        ); 
        res.send({mainSlider})
    }catch(error){
        error.status = 422;
        next(error)
    }
}


const deletePhoto = async(req,res,next)=>{
    try{
        let mainSlider = await Other.findOneAndUpdate(
            { name:req.params.name },
            { $pull: { photos: {id:req.params.id} } },
            {new:true}
        );
        res.send({mainSlider})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const getSpecialDocument = async(req,res,next)=>{
    try{
        let result = await Other.findOne(
            { name:req.params.name },
        );
        res.send({result})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const addMainListPhoto = async(req,res,next)=>{
    try{
        let result = await Other.findOneAndUpdate(
            { name:req.params.name, 'MainLists.title':req.body.title },
            { 'MainLists.$.photo':req.body.photo },
            { new:true }
        );
        res.send({result})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {
    add,
    getSpecialDocument,
    deletePhoto,
    addMainListPhoto
}