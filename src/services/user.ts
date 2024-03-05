import { User } from '../models/User';
import ConflictError from '../domain/exceptions/ConflictError';

export async function create(payload: User) {
  try {
    const animal = new User(payload);

    const res = await animal.save();

    return res;
  } catch (e: any) {
    if (e.name === 'MongoServerError' && e.code === 11000) {
      throw new ConflictError('User exists.');
    }

    throw e;
  }
}

export async function fetchAll() {
  const users = await User.find();

  return users;
}
