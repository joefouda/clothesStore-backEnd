const MainList = require('./mainListsModel')

const getMainLists = async(req,res,next)=>{
    try{
        let mainLists = await MainList.find({});
        res.send({mainLists})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const editMainListDisplayedName= async(req,res,next)=>{
    try{
        let mainList = await MainList.findOneAndUpdate(
            { title:req.params.title },
            { displayedTitle:req.body.displayedTitle },
            { new:true }
        );
        res.send({mainList})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const getMainListDisplayedName= async(req,res,next)=>{
    try{
        let mainList = await MainList.findOne(
            { title:req.params.title },
        );
        res.send({title:mainList.displayedTitle})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const editMainListPhoto = async(req,res,next)=>{
    try{
        let mainList = await MainList.findOneAndUpdate(
            { title:req.params.title },
            { photo:req.body.photo },
            { new:true }
        );
        res.send({mainList})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

const editMainListVisability = async(req,res,next)=>{
    try{
        let mainList = await MainList.findOneAndUpdate(
            { title:req.params.title },
            { hide:req.body.visable },
            { new:true }
        );
        res.send({mainList})
    }catch(error){
        error.status = 422;
        next(error)
    }
}

module.exports = {
    editMainListPhoto,
    editMainListVisability,
    getMainLists,
    editMainListDisplayedName,
    getMainListDisplayedName
}