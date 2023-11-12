import express from 'express';
import controllers from '../controllers/users-controllers.js'
const usersRouter = express.Router();

usersRouter.post('/signup', controllers.signup);
// usersRouter.post('/users/login');
// usersRouter.post('/users/logout');
// usersRouter.get('/users/current');


export default usersRouter;
