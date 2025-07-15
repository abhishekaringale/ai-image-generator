import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import razorpay from 'razorpay';
import { transactionModel } from '../models/TransactionModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'missing details' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      httpOnly: true, //prevent xss attacks
      sameSite: 'strict', //CSRF attacks cross-site request forgery attakcks
      secure: false,
    });

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('before');
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ success: false, message: 'User does not exists.' });
    }
    console.log('user not exist');
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
        httpOnly: true, //prevent xss attacks
        sameSite: 'strict', //CSRF attacks cross-site request forgery attakcks
        secure: false,
      });

      res.json({
        success: true,
        token,
        user: { name: user.name, credit: user.creditBalance },
        message: 'Login successful!',
      });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user?.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  KEY_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    let credits, plan, amount, date;
    if (planId == 'Basic') {
      plan = 'Basic';
      credits = 100;
      amount = 10;
    } else if (planId == 'Advanced') {
      plan = 'Advanced';
      credits = 500;
      amount = 50;
    } else if (planId == 'Business') {
      plan = 'Business';
      credits = 5000;
      amount = 250;
    } else {
      res.json({ success: false, message: 'Plan not found' });
    }
    date = Date.now();
    const trasactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(trasactionData);
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
