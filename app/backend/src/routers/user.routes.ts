import { Router, Request, Response } from 'express';
import UsersModel from '../database/models/UserModel';
import UsersController from '../controllers/User.controller';
import UsersService from '../services/User.service';

const usersRouter = Router();

const usersService = new UsersService(UsersModel);
const usersController = new UsersController(usersService);

usersRouter.post(
  '/',
  (req: Request, res: Response) => usersController.todoLogin(req, res),
);

export default usersRouter;
