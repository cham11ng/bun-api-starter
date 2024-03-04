import { Elysia, t } from 'elysia';

import * as userController from '../controllers/user';

export default (app: Elysia) =>
  app.group('/users', (app) =>
    app
      .post('/', userController.create, {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String()
        }),
        type: 'json'
      })
      .get('/', userController.fetchAll)
  )

