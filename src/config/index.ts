const isTestEnvironment = process.env.NODE_ENV === 'test';

export default {
  port: (isTestEnvironment ? process.env.TEST_APP_PORT : process.env.APP_PORT) || '8000',
  db: {
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbUsername: process.env.DB_USERNAME,
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
  }
}
