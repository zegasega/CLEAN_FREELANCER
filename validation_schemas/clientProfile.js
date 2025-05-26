const Joi = require('joi');

exports.create = Joi.object({
    userId: Joi.number().integer().required(),
    companyName: Joi.string().required(),
    website: Joi.string().uri().optional(),
    about: Joi.string().optional(),
    hiringGoal: Joi.string().optional(),
    hourlyPay: Joi.number().optional()
});

exports.update = Joi.object({
    userId: Joi.number().integer().required(),
    companyName: Joi.string(),
    website: Joi.string().uri(),
    about: Joi.string(),
    hiringGoal: Joi.string(),
    hourlyPay: Joi.number()
});