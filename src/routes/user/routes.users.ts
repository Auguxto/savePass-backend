import { Router } from 'express';

import isAuth from '../../middlewares/isAuth';

import UserController from '../../controllers/user/UserController';

import usersSessionRouter from '../user/session/routes.users.session';
import usersDataRouter from './data/routes.users.create';
import usersDataUpdate from './data/routes.users.update';

const usersRouter = Router();

const userController = new UserController();

// register
usersRouter.post('/', userController.create);
usersRouter.patch('/info', isAuth, userController.updateInfo);
usersRouter.patch('/address', isAuth, userController.updateAddress);

// Session
usersRouter.use('/sessions', usersSessionRouter);

// Data
usersRouter.use('/add', usersDataRouter);
usersRouter.use('/update', usersDataUpdate);

export default usersRouter;
