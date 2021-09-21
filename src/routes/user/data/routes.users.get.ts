import { Router } from 'express';

import isAuth from '../../../middlewares/isAuth';

import GetDataController from '../../../controllers/user/data/GetDataController';

const getDataController = new GetDataController();

const usersDataGet = Router();

usersDataGet.get('/credential/:id', isAuth, getDataController.getCredential);
usersDataGet.get('/card/:id', isAuth, getDataController.getCard);
usersDataGet.get('/note/:id', isAuth, getDataController.getNote);
usersDataGet.get('/folder/:id', isAuth, getDataController.getFolder);

export default usersDataGet;
