import { NotFoundError } from 'elysia';

import ConflictError from '../domain/exceptions/ConflictError';
import MongoServerError from '../domain/exceptions/MongoServerError';
import { User } from '../models/User';

/**
 * Creates a new user.
 *
 * @param payload - The user data to be created.
 * @returns {Promise<User>} A promise that resolves to the created user.
 * @throws {ConflictError} If a user with the same data already exists.
 * @throws {Error} If an error occurs while creating the user.
 */
export async function create(payload: User) {
  try {
    const user = new User(payload);

    return await user.save();
  } catch (e) {
    const error = e as MongoServerError;

    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ConflictError('User exists.');
    }

    throw error;
  }
}

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
export function fetchAll(): Promise<User[]> {
  return User.find();
}

/**
 * Fetches a user by id.
 *
 * @param {string} id The id of the user to fetch.
 * @returns {Promise<User>} A promise that resolves array User objects.
 */
export async function fetchById(id: string): Promise<User> {
  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError('User not found.');
  }

  return user;
}
