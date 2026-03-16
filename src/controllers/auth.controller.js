const userModel = require('../models/user.model');

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
}

module.exports = {
    registerUserController,
}