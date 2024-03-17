interface ErrorResponse<Code = string> {
  message: string;
  code: Code;
}

export default ErrorResponse;
