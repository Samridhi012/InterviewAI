const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//jsDOC comments - for documentation and better code readability. 
// It provides information about the function, its parameters, return type, and other relevant details.
/**
 * @name registerUserController
 * @description Controller for handling user registration
 * @route POST /api/auth/register
 * @access Public 
 */
async function registerUserController(req, res) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password."
        });
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]    //"$or" operator is used to check if either the username or email already exists in the database
    });
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address"
        });
    }

    const hash = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt rounds of 10

    const user = await userModel.create({  // Create a new user in the database with the provided username, email, and hashed password
        username,
        email,
        password: hash
    });
    
    // Generate a JWT token for the newly registered user
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(  
        {id: user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.cookie("token", token) // Set the JWT token in a cookie for authentication purposes
    
    console.log('Cookie set:', res.get('Set-Cookie'));  // Logs the cookie header to verify that the cookie is being set correctly
    
    res.status(201).json({
        message: "User registered successfully",
    });
}

/**
 * @name loginUserController
 * @description Controller for handling user login
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(400).json({
            message: "Please provide email and password."
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database

    if (!isPasswordValid) { 
        return res.status(400).json({
            message: "Invalid email or password."
        });
    }

    const token = jwt.sign(
        {id: user._id, username: user.username}, 
        process.env.JWT_SECRET, 
        {expiresIn: "1d"}
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = {
    registerUserController,
    loginUserController
}