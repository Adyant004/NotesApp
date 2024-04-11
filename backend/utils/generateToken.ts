import jwt from 'jsonwebtoken';
import { Response } from 'express'; 

export const generateTokenAndSetCookie = async (userId: any, res: Response): Promise<void> => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' }); 

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== 'development'
    });
}
