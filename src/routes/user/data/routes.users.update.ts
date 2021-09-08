import { Router } from 'express';

import isAuth from '../../../middlewares/isAuth';

import UpdateDataController from '../../../controllers/user/data/UpdateDataController';

const updateData = new UpdateDataController();

const usersDataUpdate = Router();

usersDataUpdate.patch('/note/:id', isAuth, updateData.updateNote);
usersDataUpdate.patch('/card/:id', isAuth, updateData.updateCard);
usersDataUpdate.patch('/credential/:id', isAuth, updateData.updateCredential);

export default usersDataUpdate;
