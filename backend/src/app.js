const express = require('express');
const cookieParser = require('cookie-parser');

//initiate server
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser()); //middleware to parse cookies from incoming requests

//routes
const authRouter = require('./routes/auth.routes');

//using all the routes here
app.use('/api/auth', authRouter);

module.exports = app;