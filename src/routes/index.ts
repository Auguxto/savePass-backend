import { Router } from 'express';

import usersRouter from './routes.users';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

routes.use('/users', usersRouter);

export default routes;
