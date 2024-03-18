import { jwt } from '@elysiajs/jwt';
import { Context, Elysia, t } from 'elysia';

import config from '../config';
import ConflictError from '../domain/exceptions/ConflictError';
import UnauthorizedError from '../domain/exceptions/UnauthorizedError';
import SuccessResponse from '../domain/types/SuccessResponse';
import { User } from '../models/User';

export default (app: Elysia) =>
  app
    .use(
      jwt({
        name: 'jwt',
        secret: config.auth.jwt.secret
      })
    )
    .post('/signup', async (context: Context): Promise<SuccessResponse<User>> => {
      const payload = context.body as { email: string; password: string };
      const user = await User.findOne({ email: payload.email });

      if (user) {
        throw new ConflictError('User already exists!');
      }

      await User.create(user);

      return {
        message: 'Signup successful!'
      };
    })
    .post(
      '/login',
      async (context): Promise<SuccessResponse<string>> => {
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
      },
      {
        body: t.Object({
          email: t.String({ format: 'email', maxLength: 256 }),
          password: t.String({ maxLength: 256 })
        })
      }
    )
    .guard(
      {
        headers: t.Object({
          authorization: t.TemplateLiteral('Bearer ${string}')
        })
      },
      (app2) =>
        app2
          .resolve(async (context) => {
            const {
              headers: { authorization }
            } = context;
            const profile = await context.jwt.verify(authorization.split(' ')[1]);

            if (!profile) {
              throw new UnauthorizedError('Invalid token!');
            }

            return {
              profile
            };
          })
          .get('/me', async (context): Promise<SuccessResponse<object>> => {
            return {
              message: 'User details fetched successfully!',
              data: context.profile
            };
          })
          .post('/logout', async (): Promise<SuccessResponse<string>> => {
            return {
              message: 'User logged out successfully!'
            };
          })
    );
