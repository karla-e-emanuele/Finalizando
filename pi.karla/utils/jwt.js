const jwt = require('jsonwebtoken');

const SECRET = "chavesecretademas";

function generateToken(payload) {    
    return jwt.sign({ email: payload.email}, SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    generateToken,
    verifyToken
};