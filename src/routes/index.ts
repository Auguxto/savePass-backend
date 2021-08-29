import { Router } from 'express';
import sessionsRouter from './routes.session';

import usersRouter from './routes.users';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
