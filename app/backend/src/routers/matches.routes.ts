import { Router, Request, Response } from 'express';

import MatchesService from '../services/Matches.service';
import MatchesController from '../controllers/Matches.controller';
import MatchesModel from '../database/models/MatchesModel';
import authMiddleware from '../middlewares/auth.middleware';

const matchesRouter = Router();

const matchesService = new MatchesService(MatchesModel);
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/',
  async (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  authMiddleware,
  async (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default matchesRouter;
