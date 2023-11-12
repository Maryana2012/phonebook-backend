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

export const validateBody = schema => {
    const func =(req, res, next) =>{
        const {error} = schema.validate(req.body);
        if (error){
          res.status(400).json({message:error.message});
          return;
        }
        next();
    }
    return func;
} 

