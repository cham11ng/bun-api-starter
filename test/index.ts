import path from 'path';

import config from '../src/config'

export const baseUrl = `http://${config.app.host}:${config.app.port}`;

export const getRequest = (route: string) => {
  const fullPath = path.join(baseUrl, route)

  return new Request(fullPath);
}

export const postRequest = <T>(route: string, payload: T) => {
  const fullPath = path.join(baseUrl, route)

  return new Request(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}
