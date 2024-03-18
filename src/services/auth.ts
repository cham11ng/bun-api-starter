import UnauthorizedError from '../domain/exceptions/UnauthorizedError';
import { User } from '../models/User';

/**
 * Signs in a user.
 *
 * @param payload - The user data to be signed in.
 * @param {string} payload.email The email of the user.
 * @param {string} payload.password The password of the user.
 * @returns {Promise<User>} A promise that resolves to the user that signed in.
 */
export async function signIn(payload: { email: string; password: string }) {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new UnauthorizedError('User not found!');
  }

  const isMatch = user.comparePassword(payload.password);

  if (!isMatch) {
    throw new UnauthorizedError('Invalid credentials!');
  }

  return user;
}
