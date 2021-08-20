const multer = require('multer')

exports.imageStorageArticle = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/articles')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

exports.imageStorageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/users')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

exports.fileImageFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}