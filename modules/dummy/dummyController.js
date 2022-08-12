const Dummy = require('./dummyModel')

const postNew = async (req, res, next) => {
    try {
        let dummy = new Dummy(req.body);  
        await dummy.save();
        res.send({
            message: 'signed up successfully',
        });
    } catch (error) {
        error.status = 500;
        next(error);
    }
}

const getData = async (req, res, next) => {
    try {
        let data = await Dummy.aggregate( [
            {
                $group :{
                    _id:"$managerId",
                    numberOfEmployees:{$sum: 1},
                    maxSal: { $max: "$salary" },
                    sumOfSals: {$sum: "$salary"},
                    avgAge: { $avg: "$age"}
                }
            }
        ]);
        res.send({
            data
        });
    } catch (error) {
        error.status = 500;
        next(error);
    }
}


module.exports = {
    postNew,
    getData
}