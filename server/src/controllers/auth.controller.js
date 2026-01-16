import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async(req, res)=>{
    try {
        const{name, email, password} = req.body;

        if(!name || !email || !password) return res.status(400).json({error:'All fields are required!'});

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(401).json({error:'Email alreadye exist'});

        const user = await User.create({name, email, password});

        return res.status(201).json({
            message:'User created succesfully!',
            user:{
                name: user.name,
                email:user.email,
            }
        })

    } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
        
    }
}

export const login = async(req, res)=>{
    try {   

        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({error:'fields are missing'});

        const user = await User.findOne({email});
        if(!user)return res.status(401).json({error:'Invalid credentials'})
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch)return res.status(401).json({error: 'Invalid credentials'});

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
        
    } catch (error) {
        console.log(`Error while logging in: ${error.message}`);
        
    }
}

export const logout = async(req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({status:'success', message:' logged out succesfully!'})
    } catch (error) {
        console.log(`Something went wrong: ${error.message}`);
        
    }
}

export const me = async(req, res)=>{}