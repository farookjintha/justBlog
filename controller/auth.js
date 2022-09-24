require('dotenv').config()
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check


const User = require('../models/user');
const { errorHandler }  = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password =  undefined;
        res.json({
            user
        });
    });
}

exports.signin = (req, res) =>{
    // Find the user based on email
    const { email, password } = req.body;
    User.findOne({email}, (err, user) =>{
        if(err || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please sign-up!'
            });
        }

        // If user is found make sure the email and password given is matched.
        // Create authentication method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                err: 'Email & Password do not match'
            })
        }

        // Generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, "sdfksflakglsnvjbespc");
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        //return response with user and token to frontend client
        const {_id, name, email, role} = user;

        return res.json({token, user:{_id, email, name, role} });
    });
};

exports.signout = (req, res) =>{
    res.clearCookie('t');
    res.json({
        message: "Successfully Signed out! "
    });
};

exports.requireSignIn = expressJwt({
    secret: "sdfksflakglsnvjbespc",
    userProperty: "auth"
});

exports.isAuth = (req, res, next) =>{
    console.log("Auth: ", req.auth)
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            err: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        res.status(403).json({
            err: "Admin resource: Access denied!"
        });
    }
    next();
}