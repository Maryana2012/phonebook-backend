import Joi from "joi";

export const userSignupSchema =Joi.object({
   name: Joi.string().required(),
   email: Joi.string().required(),
   password: Joi.string().required()
});

export const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

