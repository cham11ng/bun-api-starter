import { describe, expect, it } from 'bun:test'

import { app } from '../src'
import config from '../src/config'

const baseUrl = `${config.app.host}:${config.app.host}/`;

describe('Elysia', () => {
  it('return a response', async () => {
    const response = await app
      .handle(new Request(baseUrl))
      .then((res) => res.json())

    expect(response).toMatchObject({
      name: config.app.name,
      version: config.app.version
    })
  })
})
