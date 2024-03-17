import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';

export default (app: Elysia) =>
  app
    .use(cors())
