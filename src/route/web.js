import express from "express";
import homeController from "../controller/homeController";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(appRoot);
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

let uploadMutiple = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:userId', homeController.getDetailPage);
    router.post('/create/user', homeController.getCreateUserPage);
    router.post('/delete-user', homeController.getDeletePage);
    router.get('/edit-user/:id', homeController.getEditUserPage);
    router.post('/update-user', homeController.getUpdateUserPage);
    router.get('/upload', homeController.getUploadFile);
    router.post('/upload-profile-pic', upload, homeController.getUploadProfilePic);
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadMutiple(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }

            else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, homeController.getUploadMutiplePic)

    return app.use('/', router);
}

export default initWebRoute;
