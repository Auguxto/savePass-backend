import { Router } from 'express';

import isAuth from '../../middlewares/isAuth';

import UserController from '../../controllers/user/UserController';

import usersSessionRouter from '../user/session/routes.users.session';
import usersDataCreate from './data/routes.users.create';
import usersDataUpdate from './data/routes.users.update';
import usersDataGet from './data/routes.users.get';

const usersRouter = Router();

const userController = new UserController();

// register
usersRouter.post('/', userController.create);
usersRouter.patch('/info', isAuth, userController.updateInfo);
usersRouter.patch('/address', isAuth, userController.updateAddress);

// Session
usersRouter.use('/sessions', usersSessionRouter);

// Data
usersRouter.use('/add', usersDataCreate);
usersRouter.use('/update', usersDataUpdate);
usersRouter.use('/data', usersDataGet);

export default usersRouter;
