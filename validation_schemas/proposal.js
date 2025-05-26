const Joi = require('joi');

exports.create = Joi.object({
    freelancerId: Joi.number().integer().required(),
    jobId: Joi.number().integer().required(),
    coverLetter: Joi.string().required(),
    bidAmount: Joi.number().required()
});

exports.update = Joi.object({
    proposalId: Joi.number().integer().required(),
    coverLetter: Joi.string(),
    bidAmount: Joi.number()
});