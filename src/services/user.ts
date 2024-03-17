import { User } from '../models/User';
import ConflictError from '../domain/exceptions/ConflictError';

export const create = (payload: User) => {
  try {
    const user = new User(payload);

    return user.save();
  } catch (e: any) {
    if (e.name === 'MongoServerError' && e.code === 11000) {
      throw new ConflictError('User exists.');
    }

    throw e;
  }
};

export const fetchAll = () => {
  return User.find();
};
