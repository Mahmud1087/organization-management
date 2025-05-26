import express from 'express';
import { Request, Response } from 'express';
import { connectDB } from './db/connect-to-db';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes';
import departmentRoutes from './routes/department-routes';
import staffRoutes from './routes/staff-routes';
import companyRoutes from './routes/company-routes';
import leaveRequestRoutes from './routes/leave-request-routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 200, success: true, message: 'Welcome!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/leave-request', leaveRequestRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log('Server running on port:', PORT);
});
