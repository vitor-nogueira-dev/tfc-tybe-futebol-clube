import { Router, Request, Response } from 'express';
import TeamsModel from '../database/models/TeamsModel';
import TeamsController from '../controllers/Teams.controller';
import TeamService from '../services/Teams.service';

const teamsRouter = Router();

const teamsService = new TeamService(TeamsModel);
const teamsController = new TeamsController(teamsService);

teamsRouter.get(
  '/',
  (req: Request, res: Response) => teamsController.getAllTeams(req, res),
);

teamsRouter.get(
  '/:id',
  (req: Request, res: Response) => teamsController.getTeamById(req, res),
);

export default teamsRouter;
