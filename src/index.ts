import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import config from './config';
import * as db from './config/db';
import errorHandler from './middlewares/errorHandler';
import loggerHandler from './middlewares/loggerHandler';
import securityHandler from './middlewares/securityHandler';
import userRoutes from './routes/user';

const app = new Elysia();

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
  .get('/', () => {
    return {
      name: config.app.name,
      version: config.app.version
    };
  })
  .use(userRoutes)
  .listen(config.app.port, () => {
    console.log(
      `Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });

export default app;
