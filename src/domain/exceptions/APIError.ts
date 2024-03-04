class APIError extends Error {
  isCustom: boolean;
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.isCustom = true;
  }
}

export default APIError;
