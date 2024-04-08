import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const registerController = async(req, res) => {
    try{
        const existUser = await userModel.findOne({email: req.body.email});
        if(existUser){
            return res.status(200).send({message: 'User already exist', success: false})
        }
        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        if(!req.body.role){
            req.body.role = 'user';
        }

        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).send({
            success: true,
            message: 'Registration Successful',
            newUser,
        });

    }catch(error){
        console.log(`error: ${error}`.red);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const loginController = async(req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            return res.status(200).send({message: 'User not found', success: false})
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                success: false,
                message: 'Email or Password is wrong'
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).send({
            success: true,
            message: 'Login Successful',
            user,
            token,
        })

    }catch(error){
        console.log(`error: ${error}`.red);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const getTechSupportUsersController = async(req, res) => {
    try{
        const techSupportUsers = await userModel.find({role: 'tech_support'});

        res.status(200).send({
            success: true,
            users: techSupportUsers,
        })
    }catch(error){
        console.log('error in tech support:', error);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error,
        })
    }
}