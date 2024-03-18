import { Elysia } from 'elysia';

import * as authController from '../controllers/auth';
import { authSchema } from '../schema/authSchema';

export default (app: Elysia) =>
  app.use(authSchema).post('/signup', authController.signup, { body: 'auth' }).post('/login', authController.login, {
    body: 'auth'
  });
