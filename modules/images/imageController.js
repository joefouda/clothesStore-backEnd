const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${uniqueSuffix}-${Date.now()}.${extension}`)
    }
})
const upload = multer({ storage: storage })

const uploadImage = function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    res.send(`${process.env.BASE_IMAGE_PATH}${req.file.filename}`)
};

module.exports = {
    uploadImage,
    upload
}