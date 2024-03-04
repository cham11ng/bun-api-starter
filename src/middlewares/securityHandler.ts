import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';

export default (app: Elysia) =>
  app
    .use(cors())
    .use(helmet({
      contentSecurityPolicy: false
    }))
