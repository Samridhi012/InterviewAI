const {Router} = require('express');

const authRouter = Router();

//jsDOC comments for API documentation
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', (req, res) => {
    // Logic for registering a new user
    res.send('User registration endpoint');
});

module.exports = authRouter;