import { Router } from 'express';

import isAuth from '../../middlewares/isAuth';

import UserController from '../../controllers/user/UserController';

import usersDataRouter from '../user/data/routes.users.data';
import usersSessionRouter from '../user/session/routes.users.session';

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

export default usersRouter;
