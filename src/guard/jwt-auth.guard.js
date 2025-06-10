import { verifyToken } from '../utils/generate-token.js';

export const JwtAuthGuard = (req, res, next) => {
  try {
    const auth = req.headers?.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Authorization error',
      });
    }

    const token = auth.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Token not found',
      });
    }

    const decodedData = verifyToken(token);
    if (!decodedData) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Token expired or invalid',
      });
    }

    req.user = decodedData;
    next();
  } catch (e) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Authentication failed',
      error: e.message,
    });
  }
};
