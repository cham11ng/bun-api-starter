import config from '.';
import * as mongoose from 'mongoose';

const { dbUsername, dbPassword, dbHost, dbPort, dbName } = config.db;
const connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

export async function connect() {
  try {
    const res = await mongoose.connect(connectionString, { autoIndex: true });

    console.log('Info: MongoDB connection successful:', res.connection.name)
  } catch (err) {
    console.log('Error: Failed to connect MongoDB:', err)
  }
}
