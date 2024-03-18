import { Elysia, t } from 'elysia';

export const authSchema = new Elysia().model({
  auth: t.Object({
    email: t.String({ format: 'email', maxLength: 256 }),
    password: t.String({ maxLength: 256 })
  })
});
