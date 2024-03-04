import config from '.';
import * as mongoose from 'mongoose';
import { Animal } from '../models/animal';

const { dbUsername, dbPassword, dbHost, dbPort, dbName } = config.db;

// Construct the connection string
const connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

// connect to database
await mongoose.connect(connectionString);

// create new Animal
const cow = new Animal({
  name: 'Cow',
  sound: 'Moo',
});
await cow.save(); // saves to the database

// read all Animals
const animals = await Animal.find();
animals[0].speak(); // logs "Moo!"

// disconnect
await mongoose.disconnect();
