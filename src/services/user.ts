import { User } from '../models/User';

export async function create(payload: User) {
  try {

    const animal = new User(payload);

    const res = await animal.save();

    return res;
  } catch (e: any) {
    if (e.name === 'MongoServerError' && e.code === 11000) {
      console.log('Error: User exists.')
    } else {
      console.log("Error:", e);
    }

    throw e;
  }
}

export async function fetchAll() {
  const users = await User.find();

  return users;
}
