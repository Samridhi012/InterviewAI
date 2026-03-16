const express = require('express');

//initiate server
const app = express();

app.use(express.json());

//routes
const authRouter = require('./routes/auth.routes');

//using all the routes here
app.use('/api/auth', authRouter);

module.exports = app;