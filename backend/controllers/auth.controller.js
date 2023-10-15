const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { User } = require('../models/user');

let refreshTokenArray = [];


const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const userExist = await User.findOne({email: email});
            if(userExist) {
                return res.status(403).json({ massage: 'User already exists!'});
            };

            const hashPassword = bcrypt.hashSync(password, 10);

            const newUser = await User.create({ username, email, password: hashPassword });
            res.status(200).json({ massage: 'Added user successfully!', newUser});
        } catch (error) {
            console.log(error.message);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.isAdmin
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }
        );
    },
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.isAdmin
        },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: "365d" }
        );
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email});
            if(!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const matched = bcrypt.compareSync(password, user.password);
            if(!matched) {
                return res.status(401).json({ message: 'Wrong password!'});
            }

            if(user && matched) {
                const accessToken = AuthController.generateAccessToken(user);
                const refreshToken = AuthController.generateRefreshToken(user);

                refreshTokenArray.push(refreshToken);
                res.cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: false,  // deploy  => true
                    path: "/",
                    sameSite: "strict"
                });
                
                const { password, ...others } = user._doc;
                res.status(200).json({message: "Login successful", ...others, accessToken, refreshToken});
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refresh_token;
        if(!refreshToken) {
            return res.status(401).json({ message: "You're not login"});
        }
        if(!refreshTokenArray.includes(refreshToken)) {
            return res.status(403).json({msg: "Refresh token is invalid"});
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if(err) {
                res.status(401).json({ message: "Invalid refresh token"});
                return;
            }
            // remove old current token
            refreshTokenArray = refreshTokenArray.filter(token => token !== refreshToken);

            //Create new access token, refresh token
            const newAccessToken = AuthController.generateAccessToken(user);
            const newRefreshToken = AuthController.generateRefreshToken(user);

            // add new refresh token to array token
            refreshTokenArray.push(newRefreshToken);

            res.cookie("refresh_token", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            res.status(200).json({ accessToken: newAccessToken});
        });
    }
}

module.exports = AuthController;