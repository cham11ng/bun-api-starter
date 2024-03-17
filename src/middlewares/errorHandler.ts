import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes';

import ConflictError from '../domain/exceptions/ConflictError';

export default (app: Elysia) =>
  app.error({ ConflictError }).onError((handler) => {
    console.error(handler.error?.stack);

    if (handler.error instanceof ConflictError) {
      handler.set.status = handler.error.status;

      return {
        message: handler.error.message,
        status: handler.error.status
      };
    }

    if (handler.code === 'NOT_FOUND') {
      handler.set.status = StatusCodes.NOT_FOUND;
      return {
        message: 'Not Found!',
        status: handler.set.status
      };
    }

    if (handler.code === 'VALIDATION') {
      handler.set.status = StatusCodes.BAD_REQUEST;
      return {
        message: 'Bad Request!',
        status: handler.set.status
      };
    }

    handler.set.status ||= StatusCodes.SERVICE_UNAVAILABLE;

    return {
      message: 'Server Error!',
      status: handler.set.status
    };
  });
