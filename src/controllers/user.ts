import { Context } from 'elysia';
import { User } from '../models/User';
import * as userService from '../services/user';

export async function create(context: Context) {
  const { name, email, password } = context.body as User;

  const data = await userService.create({
    name, email, password
  })

  return {
    data,
    message: "User created successfully.",
  }
}

export async function fetchAll() {
  const users = await userService.fetchAll();

  return {
    message: "User fetched successfully.",
    data: users
  }
}
