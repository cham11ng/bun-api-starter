import { Elysia, t } from 'elysia';

import * as userController from '../controllers/user';

export default (app: Elysia) =>
  app
    .get('/me', userController.me)
    .get('/users/:id', userController.fetchOne)
    .post('/users', userController.create, {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 256 }),
        email: t.String({ format: 'email', maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 })
      })
    })
    .get('/users', userController.fetchAll);
