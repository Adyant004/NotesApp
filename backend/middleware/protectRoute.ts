import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { User } from '../Models/User';

interface CustomRequest extends Request {
    user?: any;
}

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        const userId = decoded.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error: any) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};
