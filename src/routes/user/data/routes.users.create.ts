import { Router } from 'express';

import isAuth from '../../../middlewares/isAuth';

import CreateDataController from '../../../controllers/user/data/CreateDataController';

const createData = new CreateDataController();

const usersDataRouter = Router();

usersDataRouter.post('/note', isAuth, createData.createNote);
usersDataRouter.post('/card', isAuth, createData.createCard);
usersDataRouter.post('/credential', isAuth, createData.createCredential);
usersDataRouter.post('/folder', isAuth, createData.createFolder);

export default usersDataRouter;
