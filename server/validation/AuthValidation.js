const Joi = require('joi');

exports.registerValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().min(4).max(20).trim(),
     prenom: Joi.string().required().min(4).max(20).trim(),
    email: Joi.string().required().trim().email(),
    password: Joi.string().required().min(6).max(1024),
  });
  return schema.validate(data);
};
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().trim().email(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
