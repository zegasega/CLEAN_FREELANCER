const Joi = require('joi');

exports.create = Joi.object({
    userId: Joi.number().integer().required(),
    title: Joi.string().required(),
    skills: Joi.string().required(),
    hourlyRate: Joi.number().required()
});

exports.update = Joi.object({
    userId: Joi.number().integer().required(),
    title: Joi.string(),
    skills: Joi.string(),
    hourlyRate: Joi.number()
});