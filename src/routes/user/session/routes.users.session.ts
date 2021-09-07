import { Router } from 'express';

import SessionController from '../../../controllers/user/session/SessionController';

const usersSessionRouter = Router();

const sessionController = new SessionController();

usersSessionRouter.post('/', sessionController.create);

export default usersSessionRouter;
