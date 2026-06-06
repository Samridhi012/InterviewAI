const express = require('express');
const cookieParser = require('cookie-parser');
const cors= require('cors');


//initiate server
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser()); //middleware to parse cookies from incoming requests
app.use(cors({
    origin: 'http://localhost:5173', //frontend url
    credentials: true, //allow cookies to be sent in cross-origin requests
}))

//routes
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

//using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
module.exports = app;