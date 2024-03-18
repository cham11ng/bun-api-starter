import cors from '@elysiajs/cors';
import jwt from '@elysiajs/jwt';
import { Elysia } from 'elysia';

import config from '../config';

export default (app: Elysia) =>
  app.use(cors()).use(
    jwt({
      name: 'jwt',
      secret: config.auth.jwt.secret
    })
  );
