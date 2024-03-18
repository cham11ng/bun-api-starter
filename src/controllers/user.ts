import { Context } from 'elysia';

import SuccessResponse from '../domain/types/SuccessResponse';
import type { User } from '../models/User';
import * as userService from '../services/user';

export const create = async (context: Context): Promise<SuccessResponse<User>> => {
  const body = context.body as User;

  const data = await userService.create(body);

  return {
    data,
    message: 'User created successfully.'
  };
};

export const fetchAll = async () => {
  const users = await userService.fetchAll();

  return {
    message: 'User fetched successfully.',
    data: users
  };
};
