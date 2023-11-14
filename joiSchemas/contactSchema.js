import Joi from "joi";

export const addContactSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
})
