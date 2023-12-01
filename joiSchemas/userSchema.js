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

export const userUpdateSchema = Joi.object({
    avatar:Joi.string(),
    updateName: Joi.string().required(),
    updateEmail:Joi.string().required(),
    updatePassword: Joi.string()
})

