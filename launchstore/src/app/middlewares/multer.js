const multer = require('multer');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images')
    },
    filename: (request, file, callback) => {
        callback(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

const fileFilter = (request, file, callback) => {
    const isAcceptable = ['image/jpg', 'image/png', 'image/jpeg'].find(acceptableFormat => acceptableFormat == file.mimetype)

    if (isAcceptable) {
        return callback(null, true);
    }

    return callback(null, false);
}

module.exports = multer({
    storage,
    fileFilter
})