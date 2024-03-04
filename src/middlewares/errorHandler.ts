import { Elysia } from 'elysia';

export default (app: Elysia) =>
  app
    .onError((handler) => {
      if (handler.code === 'NOT_FOUND') {
        handler.set.status = 404
        return {
          message: 'Not Found!',
          status: handler.set.status
        };

      } else {
        console.log("Error Message:", handler.error.message)

        handler.set.status ||= 500;

        if (handler.set.status === 400) {
          return {
            message: 'Bad Request!',
            status: handler.set.status
          };
        }
        return {
          message: 'Server Error!',
          status: handler.set.status
        }
      }
    })
