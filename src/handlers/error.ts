import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes';

import ConflictError from '../domain/exceptions/ConflictError';
import ErrorResponse from '../domain/types/ErrorResponse';

export default (app: Elysia) =>
  app.error({ ConflictError }).onError((handler): ErrorResponse<number> => {
    console.error(handler.error?.stack);

    if (handler.error instanceof ConflictError) {
      handler.set.status = handler.error.status;

      return {
        message: handler.error.message,
        code: handler.error.status
      };
    }

    if (handler.code === 'NOT_FOUND') {
      handler.set.status = StatusCodes.NOT_FOUND;
      return {
        message: 'Not Found!',
        code: handler.set.status
      };
    }

    if (handler.code === 'VALIDATION') {
      handler.set.status = StatusCodes.BAD_REQUEST;
      return {
        message: 'Bad Request!',
        code: handler.set.status
      };
    }

    handler.set.status = StatusCodes.SERVICE_UNAVAILABLE;

    return {
      message: 'Server Error!',
      code: handler.set.status
    };
  });
