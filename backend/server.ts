import express from 'express';
import schoolRouter from './routes/school';
import { sequelize } from './db'

// Sync models with database
sequelize.sync().then(() => console.log('db is ready!'));

const app = express();
const PORT = process.env.PORT || 7777;

app.use('/api/school', schoolRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;