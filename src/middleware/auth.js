const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.sendStatus(403);
    }
    return next();
}

module.exports = verifyToken;