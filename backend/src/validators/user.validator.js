const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const exportSchema = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = {
  createUserSchema,
  exportSchema,
};
