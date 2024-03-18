export default class MongoServerError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'MongoServerError';
    this.code = code;
  }
}
