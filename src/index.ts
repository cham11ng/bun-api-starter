import { Elysia } from "elysia";
import swagger from '@elysiajs/swagger';

import config from './config';
import * as db from './config/db';
import errorHandler from './middlewares/errorHandler';
import userRoutes from './routes/user';

const app = new Elysia()

db.connect();

app
  .use(errorHandler)
  .use(userRoutes)
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Bun (🍔) API Starter Docs',
        version: '0.1.0',
      },
    },
  }))
  .get("/", () => {
    return { name: 'bun-api-starter' }
  })
  .listen(config.port, () => {
    console.log(
      `Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`
    )
  });
