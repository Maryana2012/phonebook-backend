import express from 'express';
import controllers from '../controllers/users-controllers.js';
import { userLoginSchema, userSignupSchema, validateBody } from '../middlewares/userValidation.js';

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(userSignupSchema), controllers.signup);
usersRouter.post('/login', validateBody(userLoginSchema), controllers.login);
// usersRouter.post('/users/logout');
// usersRouter.get('/users/current');


export default usersRouter;
