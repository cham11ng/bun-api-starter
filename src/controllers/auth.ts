import { Context } from 'elysia';

import ConflictError from '../domain/exceptions/ConflictError';
import UnauthorizedError from '../domain/exceptions/UnauthorizedError';
import { ContextWithJWT } from '../domain/types/ContextWithJWT';
import SuccessResponse from '../domain/types/SuccessResponse';
import { User } from '../models/User';

export const signup = async (context: Context): Promise<SuccessResponse<User>> => {
  const payload = context.body as { email: string; password: string };
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new ConflictError('User already exists!');
  }

  await User.create(payload);

  return {
    message: 'Signup successful!'
  };
};

export const login = async (context: ContextWithJWT): Promise<SuccessResponse<string>> => {
  const payload = context.body as { email: string; password: string };
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new UnauthorizedError('User not found!');
  }

  const isMatch = user.comparePassword(payload.password);

  if (!isMatch) {
    throw new UnauthorizedError('Invalid credentials!');
  }

  const token = await context.jwt.sign({ id: user.id });

  return {
    message: 'User logged in successfully!',
    data: token
  };
};

export const logout = async (): Promise<SuccessResponse<string>> => {
  return {
    message: 'User logged out successfully!'
  };
};
