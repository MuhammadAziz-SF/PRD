import logger from '../config/winston.js';
import config from '../config/index.js';

class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }

  static badRequest(message = 'Bad request', code = 'BAD_REQUEST') {
    return new AppError(message, 400, code);
  }

  static unauthorized(message = 'Unauthorized access', code = 'UNAUTHORIZED') {
    return new AppError(message, 401, code);
  }

  static forbidden(message = 'Forbidden access', code = 'FORBIDDEN') {
    return new AppError(message, 403, code);
  }

  static notFound(message = 'Resource not found', code = 'NOT_FOUND') {
    return new AppError(message, 404, code);
  }

  static conflict(message = 'Conflict with current state', code = 'CONFLICT') {
    return new AppError(message, 409, code);
  }

  static internal(message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR') {
    return new AppError(message, 500, code);
  }

  static serviceUnavailable(message = 'Service unavailable', code = 'SERVICE_UNAVAILABLE') {
    return new AppError(message, 503, code);
  }

  static databaseError(err) {
    switch (err.code) {
      case '28P01':
        return AppError.unauthorized('Database authentication failed', 'DB_AUTH_ERROR');
      case '3D000':
        return AppError.internal('Database does not exist', 'DB_NOT_FOUND');
      case '08006':
        return AppError.serviceUnavailable('Database connection failed', 'DB_CONNECTION_ERROR');
      case '23505':
        return AppError.conflict('Duplicate entry', 'DUPLICATE_ENTRY');
      case '23503':
        return AppError.badRequest('Referenced record does not exist', 'FOREIGN_KEY_VIOLATION');
      case '22P02':
        return AppError.badRequest('Invalid input data', 'INVALID_INPUT');
      default:
        return null;
    }
  }
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.code) {
    const dbError = AppError.databaseError(err);
    if (dbError) {
      return res.status(dbError.statusCode).json({
        status: 'error',
        message: dbError.message,
        code: dbError.code,
      });
    }
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message,
      code: 'VALIDATION_ERROR',
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized access',
      code: 'UNAUTHORIZED',
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      status: 'error',
      message: 'Forbidden access',
      code: 'FORBIDDEN',
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      status: 'error',
      message: 'Resource not found',
      code: 'NOT_FOUND',
    });
  }

  return res.status(500).json({
    status: 'error',
    message: config.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    code: 'INTERNAL_SERVER_ERROR',
  });
};

export { AppError };
export default errorHandler;
