import Elysia from 'elysia';
import process from 'process';
import * as yc from 'yoctocolors';

import { durationString, methodString } from '../utils/logger';

export default new Elysia()
  .onBeforeHandle({ as: 'global' }, (ctx) => {
    ctx.store = { ...ctx.store, beforeTime: process.hrtime.bigint() };
  })
  .onAfterHandle({ as: 'global' }, ({ request, store }) => {
    const logStr: string[] = [];

    logStr.push(methodString(request.method));
    logStr.push(new URL(request.url).pathname);

    const beforeTime: bigint = (store as any).beforeTime;

    logStr.push(durationString(beforeTime));

    console.log(logStr.join(' '));
  })
  .onError({ as: 'global' }, ({ request, error, store }) => {
    const logStr: string[] = [];

    logStr.push(yc.red(methodString(request.method)));
    logStr.push(new URL(request.url).pathname);
    logStr.push(yc.red('Error'));

    if ('status' in error) {
      logStr.push(String(error.status));
    }

    logStr.push(error.message);

    const beforeTime: bigint = (store as any).beforeTime;
    logStr.push(durationString(beforeTime));

    console.log(logStr.join(' '));
  });
