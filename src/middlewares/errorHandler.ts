import { Elysia } from 'elysia';
import { StatusCodes } from 'http-status-codes';
import APIError from '../domain/exceptions/APIError';


export default (app: Elysia) =>
  app
    .onError((handler) => {
      console.log("Error Message:", handler.error.message)
      if (handler.error instanceof APIError) {
        handler.set.status = handler.error.code;

        return {
          message: handler.error.message,
          status: handler.error.code
        }
      }

      if (handler.code === 'NOT_FOUND') {
        handler.set.status = StatusCodes.NOT_FOUND
        return {
          message: 'Not Found!',
          status: handler.set.status
        };

      }
      if (handler.set.status === StatusCodes.BAD_REQUEST) {
        return {
          message: 'Bad Request!',
          status: handler.set.status
        };
      }

      handler.set.status ||= StatusCodes.SERVICE_UNAVAILABLE;

      return {
        message: 'Server Error!',
        status: handler.set.status
      }
    })
