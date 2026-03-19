const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');

//middleware has three parameters - req, res and next.
//next is a function that is called to pass control to the next middleware function in the stack.
async function authUser(req,res,next){
    const token = req.cookies.token; // Extract the JWT token from the cookies in the incoming request

    if(!token) {
        return res.status(401).json({
            message: "Token not provided."
        });
    }

    const isTokenBlacklisted = await blacklistModel.findOne({ token });
    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is blacklisted."
        });
    }

    try{
        //jwt.verify(token, secretOrPublicKey, [options, callback])
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // Attach the decoded user information to the request object for use in subsequent middleware or route handlers

        next(); // Pass control to the next middleware function in the stack
    
    } catch (error) { //if token expired or invalid, it will throw an error which we catch here
        return res.status(401).json({
            message: "Invalid token."
        });

    }
}

module.exports = authUser;