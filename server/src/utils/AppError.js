class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = true; // Flag to denote operational, trusted error: send response to client

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
