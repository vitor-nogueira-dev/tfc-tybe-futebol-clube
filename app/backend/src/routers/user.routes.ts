import { Router, Request, Response } from 'express';
import UsersModel from '../database/models/UserModel';
import UsersController from '../controllers/User.controller';
import UsersService from '../services/User.service';
import authMiddleware from '../middlewares/auth.middleware';
import AuthController from '../controllers/AuthController';

const usersRouter = Router();

const usersService = new UsersService(UsersModel);
const usersController = new UsersController(usersService);

usersRouter.post(
  '/',
  (req: Request, res: Response) => usersController.todoLogin(req, res),
);

// const authService = new UsersService(UsersModel);
// const authController = new AuthController(usersService);

usersRouter.get(
  '/role',
  authMiddleware,
  (req: Request, res: Response) => AuthController.login(req, res),
);

export default usersRouter;
