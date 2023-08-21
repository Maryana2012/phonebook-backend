import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/users/signup');
usersRouter.post('/users/login');
usersRouter.post('/users/logout');
usersRouter.get('/users/current');

export default usersRouter;
