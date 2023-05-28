const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const { INVALID_CREDENTIALS, USER_ALREADY_EXISTS, SERVER_ERR } = require('../utils/error');

function checkCredentials( email, password,repassword,name) {
    if ( !name || !email || !password || !repassword || (password!==repassword)) {
        return false;
    }
    return true;
}

async function userExists(credential) {
    let user = await User.findOne(credential);
    return user;
}

// Creating a new user
const registerUser = async (req, res, next) => {
    try{
        const {email,password,repassword,name } = req.body;
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!checkCredentials( email, password,repassword,name) || !email.match(pattern)) {
        next({
            status: 400,
            message: INVALID_CREDENTIALS
        });
        return;
    }
    
    const emailExists =await userExists({email:email});
    if (emailExists) {
        next({
            status: 400,
            message: USER_ALREADY_EXISTS
        });
        return;
    }
    let hash = bcrypt.hashSync(password,12);
    let user = await User.create({
        name,
        email,
        password:hash
    });
    if(user){
        user =user.toObject();
        const token = generateToken(user._id);
        user['token']=token;
        for(const item in user){
            if(item!=='name'&&item!=='email'&&item!=='token')
            delete user[item];
        }
        res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    }
    }
    catch(error) {
        console.log(error);
        next({
            status: 500,
            message: SERVER_ERR
        });
        return;
    }
}

async function getUser(req,res,next){
    try{
        let user = await userExists({email:req.user.email})
        if(!user){
            next({
                status:400,
                message:'no user data'
            })
            return;
        }
        user =user.toObject();
        const token = generateToken(user._id);
        user['token']=token;
        for(const item in user){
            if(item!=='name'&&item!=='email'&&item!=='token')
            delete user[item];
        }
        res.status(201).json({
            message: 'User fetched successfully',
            data: user
        });
    }
    catch(error){
        console.log(error);
        next({
            status:500,
            message:SERVER_ERR
        })
    }
}

module.exports = {
    registerUser,
    getUser
};