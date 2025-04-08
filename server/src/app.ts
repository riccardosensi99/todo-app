import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

export default app;
