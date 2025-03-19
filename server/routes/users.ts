import express from 'express';

import cors from 'cors';

import 'dotenv/config';

import {getAllUsers, getUser, addUser, updateUser, deleteUser, getLocations, getUserByNameAndLocation} from '../controllers/usersController.js';

const userRouter = express.Router();

userRouter.use(cors());

userRouter.use(express.json());

// Exact Routes
userRouter.get('/', getAllUsers);
userRouter.post('/',addUser);
userRouter.get('/locations', getLocations);

//  Parametrized Routes
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.get('/:name/:location', getUserByNameAndLocation);

export default userRouter;