import data from '../../package.json';

const isTestEnvironment = Bun.env.NODE_ENV === 'test';

export default {
  app: {
    env: Bun.env.NODE_ENV,
    name: data.name,
    version: data.version,
    host: Bun.env.TEST_APP_HOST,
    port: (isTestEnvironment ? Bun.env.TEST_APP_PORT : Bun.env.APP_PORT) || '8000'
  },
  db: {
    dbName: Bun.env.DB_NAME,
    dbPassword: Bun.env.DB_PASSWORD,
    dbUsername: Bun.env.DB_USERNAME,
    dbPort: Bun.env.DB_PORT,
    dbHost: Bun.env.DB_HOST
  },
  auth: {
    jwt: {
      secret: Bun.env.JWT_SECRET as string
    }
  }
};
