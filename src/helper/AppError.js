class AppError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
