const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {

    try{

        const {
            username,
            email,
            phone,
            password,
            referralCode
        } = req.body;

        const emailExists = await User.findOne({ email });

        if(emailExists){

            return res.status(400).json({
                success:false,
                message:"Email already exists."
            });

        }

        const usernameExists = await User.findOne({ username });

        if(usernameExists){

            return res.status(400).json({
                success:false,
                message:"Username already exists."
            });

        }

        const phoneExists = await User.findOne({ phone });

        if(phoneExists){

            return res.status(400).json({
                success:false,
                message:"Phone number already exists."
            });

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({

            username,

            email,

            phone,

            password:hashedPassword,

            referredBy:referralCode || ""

        });

        await newUser.save();

        res.status(201).json({

            success:true,

            message:"Registration Successful"

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
exports.login = async (req, res) => {

    try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){

            return res.status(401).json({

                success:false,

                message:"Invalid email or password."

            });

        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){

            return res.status(401).json({

                success:false,

                message:"Invalid email or password."

            });

        }

        const token = jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET || "nexearn-secret",

            {
                expiresIn:"7d"
            }

        );

        res.json({

            success:true,

            message:"Login Successful",

            token,

            user:{

                id:user._id,

                username:user.username,

                email:user.email,

                balance:user.balance,

                totalEarnings:user.totalEarnings,

                activeInvestment:user.activeInvestment,

                totalDeposit:user.totalDeposit,

                totalWithdrawal:user.totalWithdrawal

            }

        });

    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};