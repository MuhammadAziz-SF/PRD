/**
 * Middleware for request validation using Joi
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationResults = {};
    let hasErrors = false;

    // Validate request body if schema.body is defined
    if (schema.body && Object.keys(req.body).length) {
      const { error, value } = schema.body.validate(req.body, { abortEarly: false });
      
      if (error) {
        validationResults.body = error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        }));
        hasErrors = true;
      } else {
        req.body = value;
      }
    }

    // Validate request params if schema.params is defined
    if (schema.params && Object.keys(req.params).length) {
      const { error, value } = schema.params.validate(req.params, { abortEarly: false });
      
      if (error) {
        validationResults.params = error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        }));
        hasErrors = true;
      } else {
        req.params = value;
      }
    }

    // Validate request query if schema.query is defined
    if (schema.query && Object.keys(req.query).length) {
      const { error, value } = schema.query.validate(req.query, { abortEarly: false });
      
      if (error) {
        validationResults.query = error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        }));
        hasErrors = true;
      } else {
        req.query = value;
      }
    }

    if (hasErrors) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationResults,
      });
    }

    return next();
  };
}; 