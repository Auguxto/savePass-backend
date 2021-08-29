import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import isAuth from '../middlewares/isAuth';

import UserController from '../controllers/UserController';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/', userController.create);
usersRouter.patch('/info', isAuth, userController.updateInfo);
usersRouter.get('/', async (request, response) => {
  const usersRepo = getCustomRepository(UsersRepository);

  const users = await usersRepo.find({ relations: ['infos'] });

  return response.json({ users });
});

export default usersRouter;
