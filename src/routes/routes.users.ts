import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import isAuth from '../middlewares/isAuth';

import UserController from '../controllers/UserController';
import UserDataController from '../controllers/UserDataController';

import UsersRepository from '../repositories/UsersRepository';

import Note from '../models/Note';

const usersRouter = Router();

const userController = new UserController();
const userDataController = new UserDataController();

// register
usersRouter.post('/', userController.create);
usersRouter.patch('/info', isAuth, userController.updateInfo);
usersRouter.patch('/address', isAuth, userController.updateAddress);
// Data
usersRouter.post('/add/note', isAuth, userDataController.createNote);

usersRouter.get('/', async (request, response) => {
  const usersRepo = getCustomRepository(UsersRepository);

  const user = await usersRepo.findOne({
    relations: ['infos', 'address', 'notes'],
  });

  return response.json({ user });
});

export default usersRouter;
