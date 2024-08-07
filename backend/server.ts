import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import auth from './routes/auth';
import userRoutes from './routes/userRoutes';
import { connectDB } from './models';
import bodyParser from 'body-parser';
import path from 'path';
import studentPhotoRoutes from './routes/studentPhotoRoutes';
import aicteInternRoutes from './routes/aicteInternRoutes';
import dailyLogRoutes from './routes/dailyLogRoutes';
import collegeRoutes from './routes/collegeRoutes';
import degreeRoutes from './routes/degreeRoutes'
import dashboard from './routes/dashboard'

import fileUpload from 'express-fileupload';
import paymentRoutes from './routes/paymentRoutes'
import preScreeningRoutes  from './routes/preScreenRoutes'
import approvalRoutes from './routes/approvalRoutes'
import verifyPaymentRoutes from './routes/verifyPaymentRoutes'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "/Web/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/Web/build/index.html"));
});
// Use CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Remove or comment out the line serving the uploads directory if not needed
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/daily-logs', dailyLogRoutes);
app.use('/api/auth', auth);
app.use('/api/users', userRoutes);
app.use('/api/photos', studentPhotoRoutes);
app.use('/api/aicte-interns', aicteInternRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/degree', degreeRoutes);
app.use('/api/dashboard', dashboard);
app.use('/api/payments', paymentRoutes);
app.use('/api/prescreening', preScreeningRoutes);
app.use('/api/approval', approvalRoutes);
app.use('/api/verify-payment', verifyPaymentRoutes);



app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
});
       