import { describe, expect, it } from 'bun:test';

import { app } from '../src';
import config from '../src/config';
import { getRequest } from '.';

describe('Elysia', () => {
  it('return a response', async () => {
    const response = await app.handle(getRequest('/')).then((res: Response) => res.json());

    expect(response).toMatchObject({
      name: config.app.name,
      version: config.app.version
    });
  });
});
