import { Context } from 'elysia';

export interface ContextWithJWT extends Context {
  jwt: {
    readonly sign: (morePayload: Record<string, string | number>) => Promise<string>;
    readonly verify: (jwt?: string | undefined) => Promise<false | Record<string, string | number>>;
  };
}
