import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://smart-leads-dashboard-theta.vercel.app',
    'https://smart-leads-dashboard-jqiqrlnpn-ashraf-s-projects2.vercel.app',
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorMiddleware);

export default app;
