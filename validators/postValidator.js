const Joi = require('joi')

exports.postValidator = Joi.object({
    authorName: Joi.object().required(),
    text: Joi.string().min(5).required(),
    image: Joi.string().optional(),
    likes: Joi.array().required(),
    comments: Joi.array().required()
})
