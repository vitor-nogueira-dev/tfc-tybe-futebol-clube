import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoard.controller';
import LeaderBoardService from '../services/leader.board.service';
import LeaderBoardModel from '../database/models/MatchesModel';

const leaderdRouter = Router();

const leaderBoardService = new LeaderBoardService(LeaderBoardModel);
const boardController = new LeaderBoardController(leaderBoardService);

leaderdRouter.get(
  '/home',
  (req: Request, res: Response) => boardController.getLeaderBoardHome(req, res),
);

leaderdRouter.get(
  '/away',
  (req: Request, res: Response) => boardController.getLeadeerBoardAway(req, res),
);

leaderdRouter.get(
  '/',
  (req: Request, res: Response) => boardController.getLeaderBoardAll(req, res),
);

export default leaderdRouter;
