const {verifyToken} = require("../utils/jwt");

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'token not provided' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: 'invalid token' });
    }
}	

module.exports = authMiddleware;