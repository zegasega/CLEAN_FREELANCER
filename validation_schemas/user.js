const Joi = require('joi');

exports.create = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('client', 'freelancer', 'admin').required(),
    name: Joi.string().required()
});

exports.update = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string(),
    role: Joi.string().valid('client', 'freelancer', 'admin')
});