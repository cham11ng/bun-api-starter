import { Elysia, t } from 'elysia';

import * as authController from '../controllers/auth';
import authenticate from '../handlers/authenticate';
import userRoutes from '../routes/user';

export default (app: Elysia) =>
  app.guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral('Bearer ${string}')
      })
    },
    (app2) => app2.use(authenticate).use(userRoutes).post('/logout', authController.logout)
  );
