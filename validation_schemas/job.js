const Joi = require('joi');

exports.create = Joi.object({
    clientId: Joi.number().integer().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    budget: Joi.number().required()
});

exports.update = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    budget: Joi.number()
});