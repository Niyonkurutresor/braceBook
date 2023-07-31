class AppError extends Error {
  constructor(statusCode, message, originalError) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.isOperation = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
