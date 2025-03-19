import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getAllNotifications, getUserNotifications, addNotification} from '../controllers/userNotificationsController.js';


const userNotificationsRouter = express.Router();

userNotificationsRouter.use(cors());

userNotificationsRouter.use(express.json());

userNotificationsRouter.get('/', getAllNotifications);
userNotificationsRouter.post('/', addNotification);
userNotificationsRouter.get('/:id', getUserNotifications);

export default userNotificationsRouter;