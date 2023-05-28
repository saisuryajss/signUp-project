const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { NOT_AUTHORIZED } = require('./error');

const verifyAuth = async (req, res, next) => {
    let token = null;
    const { authorization } = req.headers;
    console.log(authorization);
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        }
        catch (error) {
            console.log(error);
            res.status(401).json({
                message: NOT_AUTHORIZED
            });
            return;
        }
    }
    next();
}

module.exports = verifyAuth;