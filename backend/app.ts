import express from 'express';
import schoolRouter from './routes/school';
import { sequelize } from './db'
import dotenv from 'dotenv';

dotenv.config();

// Sync models with database
sequelize.sync().then(() => console.log('db is ready!'));

const app = express();

app.use(express.json());

app.use('/api/school', schoolRouter);

export default app;