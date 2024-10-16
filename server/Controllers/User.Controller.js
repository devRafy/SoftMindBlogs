const UserModel = require("../models/User.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    const { username, password } = req.body;


    if (!username || !password || username === '' || password === '') {
        return res.status(400).json({ message: "All fields are Required For SignUp" });
    }

    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await UserModel.create({
            username: username,
            password: hashPassword
        });

        res.status(200).json({
            message: "User created successfully",
            rest: {
                _id: newUser._id,
                username: username,
            }
        });
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.username) {
            return res.status(400).json({ message: "Username already exists" });
        }
        return res.status(400).json({ message: e });
    }
};

const signIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username === '' || password === '') {
        return res.status(404).json({ message: "All fields are Required For SignIn" });
    }
    try {
        const validUser = await UserModel.findOne({ username: username });

        if (!validUser) {
            return res.status(404).json({ message: "User Name Not found" });
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);

        if (validPassword) {
            const { password: pass, ...rest } = validUser._doc;
            const token = jwt.sign({ id: validUser._id ,isAdmin:validUser.isAdmin }, process.env.JWT);
            return res.status(200).cookie('access_token', token, {
                httpOnly: true
            }).json({rest});
        } else {
            return res.status(400).json({ message: "Password is Incorrect" });
        }

    } catch (e) {
    
        return res.status(500).json({ message: e });
    }
}

const signout = async (req ,  res )=>{
    try {
       res.clearCookie('access_token').status(200).json("User has been signed out");
    }catch (e) {
        return res.status(404).json({ message:e });

    }
 }
 
module.exports = {
    signUp,
    signIn,
    signout
};
