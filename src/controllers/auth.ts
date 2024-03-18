import { Context } from 'elysia';

import { ContextWithJWT } from '../domain/types/extends/ContextWithJWT';
import SuccessResponse from '../domain/types/generics/SuccessResponse';
import { User } from '../models/User';
import { signIn } from '../services/auth';
import { create } from '../services/user';

export const signup = async (context: Context): Promise<SuccessResponse<User>> => {
  const payload = context.body as User;

  await create(payload);

  return {
    message: 'Signup successful!'
  };
};

export const login = async (context: ContextWithJWT): Promise<SuccessResponse<string>> => {
  const payload = context.body as { email: string; password: string };

  const user = await signIn(payload);
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
