import { StatusCodes } from 'http-status-codes';

class ConflictError extends Error {
  public status: number;

  constructor(public message: string) {
    super(message);

    this.status = StatusCodes.CONFLICT;
  }
}

export default ConflictError;
