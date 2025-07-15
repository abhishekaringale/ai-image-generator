import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send('api working'));

app.listen(PORT, async () => {
  console.log('running');
  await connectDB();
});
