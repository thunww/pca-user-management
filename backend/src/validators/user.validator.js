const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  password: Joi.string()
    .min(6)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "number")
    .required()
    .messages({
      "string.pattern.name":
        "Password must contain at least 1 {{#name}} letter",
      "string.min": "Password must be at least 6 characters",
    }),
});

const exportSchema = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = { createUserSchema, exportSchema };
