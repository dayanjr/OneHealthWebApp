import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import { errorHandler } from './middleware/errors.js';

import userRouter from './routes/users.js';

import rewardsRouter from './routes/rewards.js';

import userRewardsRouter from './routes/userRewards.js';

import userNotificationsRouter from './routes/userNotifications.js';

import userMedicationsRouter from './routes/userMed.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(errorHandler);


app.use('/users/rewards', userRewardsRouter);

app.use('/users/notifications', userNotificationsRouter);

app.use('/users/drugs', userMedicationsRouter);

app.use('/rewards', rewardsRouter);

app.use('/users', userRouter);


app.listen(process.env.DEV_PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.DEV_PORT);
});

app.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${process.env.DEV_PORT} is already in use.`);
      // Optionally, you can try to listen on a different port or exit the application
      process.exit(1);  // Exit the process with a non-zero status code
    } else {
      console.error('Server error:', err.message);
      process.exit(1);  // Exit on other errors as well
    }
  });