import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { connectDB } from './models';
import bodyParser from 'body-parser';
import path from 'path';
import studentPhotoRoutes from './routes/studentPhotoRoutes';
import aicteInternRoutes from './routes/aicteInternRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Remove or comment out the line serving the uploads directory if not needed
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/photos', studentPhotoRoutes);
app.use('/api/aicte',aicteInternRoutes);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
});
