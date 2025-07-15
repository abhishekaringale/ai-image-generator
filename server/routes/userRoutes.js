import express from 'express';
import {
  loginUser,
  logoutUser,
  paymentRazorpay,
  registerUser,
  userCredits,
} from '../controllers/userController.js';
import { userAuth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);

export default userRouter;
