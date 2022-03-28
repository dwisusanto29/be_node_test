module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token', 'x-requested-with', 'content-type', 'accept', 'origin', 'authorization', 'x-csrf-token'
        );
        next();
    });

}