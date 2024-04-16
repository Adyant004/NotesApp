import { StatusCodes } from 'http-status-codes'
import { Request,Response } from 'express';
import { User } from '../Models/User';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateToken';

type UserProfile = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

type loginDetails = {
    username: string,
    password: string
}

export const signup = async (req: Request,res: Response) => {
    try {
        const {username,email,password,confirmPassword}: UserProfile = req.body;

        if(!username || !email || !password || !confirmPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields must be filled!" })
        }

        if(password !== confirmPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password don't match"})
        }

        const user = await User.findOne({ username })

        if(user){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists! "})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if(newUser) {
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(StatusCodes.CREATED).json({ 
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid User details! "})
        }

    } catch (error: any) {
        console.log("Error in signup controller", error.message);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
    }
}

export const login = async (req: Request,res: Response) => {
    try {
        const { username,password }: loginDetails = req.body;

        if(!username || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields must be filled!" })
        }

        const user = await User.findOne({ username })
        const comparePassword = await bcrypt.compare(password, user?.password || "");

        if(!user || !comparePassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid username or password" })
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(StatusCodes.OK).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password
        })

    } catch (error: any) {
        console.log("Error in login controller", error.message);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
    }
}

export const logout = (req: Request,res: Response) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
        res.status(StatusCodes.OK).json({ message: "Logout successfully! "})
    } catch (error: any) {
        console.log("Error in logout controller", error.message);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
    }
}