import { Elysia, t } from 'elysia';
import * as userController from '../controllers/user';

export default new Elysia()
  .post('/users', userController.create, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  })
  .get('/users', userController.fetchAll);
