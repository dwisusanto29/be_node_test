const controller = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const multerNone = multer().none();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './images/users')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//         cb(null, uniqueSuffix + ext);
//     }
// })

// const upload = multer({ storage: storage })

// const storageMerchant = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './images/merchant')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//         cb(null, uniqueSuffix + ext);
//     }
// })

// const uploadMerchant = multer({ storage: storageMerchant });

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, asMerchant"
        );
        next();
    });

    app.post('/register', multerNone, controller.register);
    app.post('/login', multerNone, controller.signIn);

    app.get("/profile", auth, userController.detail);
    app.post("/profile", [auth, upload.single('images')], userController.update);
};


