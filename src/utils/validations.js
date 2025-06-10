import Joi from 'joi';

export const validations = {
  email: value => {
    const schema = Joi.string()
      .email({ tlds: { allow: false } })
      .min(5)
      .max(100)
      .required()
      .messages({
        'string.email': 'Invalid email format',
        'string.min': 'Email must be at least 5 characters',
        'string.max': 'Email must be less than 100 characters',
        'any.required': 'Email is required',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  password: value => {
    const schema = Joi.string().min(6).max(50).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be less than 50 characters',
      'any.required': 'Password is required',
    });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  phone: value => {
    const schema = Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .min(10)
      .max(15)
      .required()
      .messages({
        'string.pattern.base': 'Invalid phone number format',
        'string.min': 'Phone number must be at least 10 digits',
        'string.max': 'Phone number must be less than 15 digits',
        'any.required': 'Phone number is required',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  name: value => {
    const schema = Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must be less than 50 characters',
        'string.pattern.base': 'Name can only contain letters and spaces',
        'any.required': 'Name is required',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  username: value => {
    const schema = Joi.string()
      .min(3)
      .max(30)
      .pattern(/^[a-zA-Z0-9_]+$/)
      .required()
      .messages({
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must be less than 30 characters',
        'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
        'any.required': 'Username is required',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  url: value => {
    const schema = Joi.string().uri().max(2048).required().messages({
      'string.uri': 'Invalid URL format',
      'string.max': 'URL must be less than 2048 characters',
      'any.required': 'URL is required',
    });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  number: value => {
    const schema = Joi.number().integer().min(0).required().messages({
      'number.base': 'Must be a number',
      'number.integer': 'Must be a whole number',
      'number.min': 'Number must be positive',
      'any.required': 'Number is required',
    });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  date: value => {
    const schema = Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        'string.pattern.base': 'Date must be in YYYY-MM-DD format',
        'any.required': 'Date is required',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  boolean: value => {
    const schema = Joi.boolean().required();
    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  optionalEmail: value => {
    if (!value) return null;

    const schema = Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Invalid email format',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  optionalPhone: value => {
    if (!value) return null;

    const schema = Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .messages({
        'string.pattern.base': 'Invalid phone number format',
      });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },

  optionalName: value => {
    if (!value) return null;

    const schema = Joi.string().min(2).messages({
      'string.min': 'Name must be at least 2 characters',
    });

    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  },
};
