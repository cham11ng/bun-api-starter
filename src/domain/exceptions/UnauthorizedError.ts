import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends Error {
  public status: number;

  constructor(public message: string) {
    super(message);

    this.status = StatusCodes.UNAUTHORIZED;
  }
}
