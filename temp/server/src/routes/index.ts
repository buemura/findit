import { Router, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDoc from '../config/swagger-config.json';
import { NotFoundError } from '../errors/NotFoundError';

import { auth } from './auth.routes';
import { users } from './users.routes';
import { portfolios } from './portfolios.routes';
import { feedbacks } from './feedbacks.routes';
import { services } from './services.routes';
import { comments } from './comments.routes';
import { categories } from './categories.routes';
import { chats } from './chats.routes';

export const routes = Router();

routes
  .get('/', (_: Request, res: Response) => {
    res.send({ message: 'You are in the backend API' });
  })
  .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  .use(
    '/api',
    auth,
    users,
    portfolios,
    feedbacks,
    services,
    comments,
    categories,
    chats,
  )
  .all('*', async () => {
    throw new NotFoundError('Route not found');
  });
