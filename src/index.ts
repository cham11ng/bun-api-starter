import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import config from './config';
import * as db from './config/db';
import errorHandler from './handlers/error';
import loggerHandler from './handlers/logger';
import securityHandler from './handlers/security';
import userRoutes from './routes/user';

export const app = new Elysia();

db.connect();

app
  .use(loggerHandler)
  .use(securityHandler)
  .use(errorHandler)
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Bun (🍔) API Starter Docs',
          version: config.app.version
        }
      }
    })
  )
  .get('/', () => ({
    name: config.app.name,
    version: config.app.version
  }))
  .use(userRoutes)
  .listen(config.app.port, () => {
    console.log(`Environment: ${config.app.env}`);
    console.log(`Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`);
  });
