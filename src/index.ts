import { Elysia } from "elysia";
import swagger from '@elysiajs/swagger';
import { logger } from '@grotto/logysia';

import config from './config';
import * as db from './config/db';
import userRoutes from './routes/user';
import errorHandler from './middlewares/errorHandler';
import securityHandler from './middlewares/securityHandler';

export const app = new Elysia()

db.connect();

app
  .use(logger())
  .use(securityHandler)
  .use(errorHandler)
  .use(userRoutes)
  .use(swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'Bun (🍔) API Starter Docs',
        version: config.app.version,
      },
    },
  }))
  .get("/", () => {
    return {
      name: config.app.name,
      version: config.app.version
    }
  })
  .listen(config.app.port, () => {
    console.log(
      `Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`
    )
  });
