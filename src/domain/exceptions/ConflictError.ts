import { StatusCodes } from 'http-status-codes';

import APIError from './APIError';

class ConflictError extends APIError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);

    this.message = message;
  }
}

export default ConflictError;
