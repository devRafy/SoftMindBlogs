const express = require('express');
const authRout = express.Router();
const authController = require('../Controllers/User.Controller.js');


authRout.post('/register' , authController.signUp);
authRout.post('/login' ,authController.signIn);
authRout.post('/signout' ,authController.signout);

module.exports = authRout;
