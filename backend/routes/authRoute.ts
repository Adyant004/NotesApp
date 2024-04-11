import express from "express";
const authRouter = express.Router();

import { signup,login,logout } from '../controllers/authController'

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/logout').post(logout);

export default authRouter;