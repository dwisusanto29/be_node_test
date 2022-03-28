const controller = require('../controllers/auth.controller');
const auth = require('../middleware/auth');
const multer = require('multer');
const multerNone = multer().none();

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, asMerchant"
        );
        next();
    });

    app.post('/v1/user/create', multerNone, controller.register);
    app.post('/login', multerNone, controller.signIn);;
};


