import * as mongoose from 'mongoose';
import { Animal } from '../models/animal';

// connect to database
await mongoose.connect('mongodb://127.0.0.1:27017/mongoose-app');

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
