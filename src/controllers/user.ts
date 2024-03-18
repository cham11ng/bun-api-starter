import { Context } from 'elysia';

import { ContextWithUser } from '../domain/types/extends/ContextWithUser';
import SuccessResponse from '../domain/types/generics/SuccessResponse';
import LoggedInUser from '../domain/types/LoggedInUser';
import type { User } from '../models/User';
import * as userService from '../services/user';

export const me = async (context: ContextWithUser): Promise<SuccessResponse<LoggedInUser>> => {
  return {
    message: 'User details fetched successfully!',
    data: context.user
  };
};

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

export const fetchOne = async (context: Context) => {
  const { id } = context.params;
  const user = await userService.fetchById(id);

  return {
    message: 'User fetched successfully.',
    data: user
  };
};
