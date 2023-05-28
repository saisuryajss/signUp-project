const express = require('express');
const { registerUser,getUser } = require('../controllers/userController');
const verifyAuth = require('../utils/authMiddleware');

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(verifyAuth,getUser);

module.exports = userRouter;