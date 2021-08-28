import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

import './database/database';

import errorHandler from './middlewares/errorHandler';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3333, () => console.log('Server started on port 3333!'));
