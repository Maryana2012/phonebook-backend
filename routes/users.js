import express from 'express';
import controllers from '../controllers/users-controllers.js';
import { userLoginSchema, userSignupSchema} from '../joiSchemas/userSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(userSignupSchema), controllers.signup);
usersRouter.post('/login', validateBody(userLoginSchema), controllers.login);
usersRouter.post('/logout', authenticate, controllers.logout);
usersRouter.get('/current', authenticate, controllers.getCurrentUser);


export default usersRouter;
