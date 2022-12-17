const Address = require('./addressModel')

const getAllAddresses = async (req, res, next) => {
    try {
        const addresses = await Address.find({});
        res.send({
            addresses
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

const addNewAddress = async (req, res, next) => {
    try {
        req.body.addresses.map(async address => {   
            let newAddress = new Address(address);
            await newAddress.save()
        })

        const addresses = await Address.find({})
        res.send({
            addresses
        })
    }
    catch (error) {
        error.status = 422;
        next(error)
    }
}

module.exports = {
    getAllAddresses,
    addNewAddress
}