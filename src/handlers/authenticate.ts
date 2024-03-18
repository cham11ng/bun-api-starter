import { Elysia } from 'elysia';

import UnauthorizedError from '../domain/exceptions/UnauthorizedError';

export default (app: Elysia) =>
  // @ts-expect-error This remains valid after JWT is implemented.
  app.derive(async ({ jwt, headers: { authorization } }) => {
    console.log(authorization);
    const user = await jwt.verify(authorization?.split(' ')[1]);

    if (!user) {
      throw new UnauthorizedError('Invalid token!');
    }

    return {
      user
    };
  });
