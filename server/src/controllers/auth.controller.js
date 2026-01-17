// auth.controller.js
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async(req, res, next)=>{

        const{name, email, password} = req.body;

        if(!name || !email || !password) return next(new AppError("All fields required", 400))

        const existingUser = await User.findOne({email});
        if(existingUser) return next(new AppError("User already exists", 409))

        const user = await User.create({name, email, password});

        return res.status(201).json({
            message:'User created succesfully!',
            user:{
                name: user.name,
                email:user.email,
            }
        })
}

export const login = async(req, res, next)=>{   

        const {email, password} = req.body;

        if(!email || !password) return next(new AppError("Not authorized, token missing", 401))

        const user = await User.findOne({email});
        if(!user)return next(new AppError("Invalid credentials", 401))
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch)return next(new AppError("Invalid credentials", 401))

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message:'Logged in succesfully',
            token,
            user:{
                id: user._id,
                email: user.email,
            }
        })
        
}

export const logout = async(req, res)=>{

        res.clearCookie('token',{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({status:'success', message:' logged out succesfully!'})
}

export const me = async(req, res)=>{

        return res.status(200).json({
            status:'success',
            user:req.user,
        })
}