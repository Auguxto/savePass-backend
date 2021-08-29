import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import isAuth from '../middlewares/isAuth';

import UserController from '../controllers/UserController';
import UserDataController from '../controllers/UserDataController';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

const userController = new UserController();
const userDataController = new UserDataController();

// register
usersRouter.post('/', userController.create);
usersRouter.patch('/info', isAuth, userController.updateInfo);
usersRouter.patch('/address', isAuth, userController.updateAddress);

// Data
usersRouter.post('/add/note', isAuth, userDataController.createNote);
usersRouter.post('/add/card', isAuth, userDataController.createCard);
usersRouter.post(
  '/add/credential',
  isAuth,
  userDataController.createCredential,
);

usersRouter.get('/', async (request, response) => {
  const usersRepo = getCustomRepository(UsersRepository);

  // relations: ['infos', 'address', 'notes', 'credentials', 'cards'],
  const user = await usersRepo.findOne({
    relations: ['infos', 'address', 'notes', 'credentials', 'cards'],
  });

  return response.json({ user });
});

export default usersRouter;
