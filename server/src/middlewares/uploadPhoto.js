const multer = require("multer");

const uploadPhoto = () => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new Error("Not an image, playload only images!"), false);
        }
    };

    const uploadMiddleware = multer({
        storage: multerStorage,
        fileFilter: multerFilter,
    }).single("image");

    return uploadMiddleware;
};

module.exports = uploadPhoto;
