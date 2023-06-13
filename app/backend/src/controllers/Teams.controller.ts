import { Request, Response } from 'express';
import TeamService from '../services/Teams.service';

class TeamsController {
  constructor(
    private teamService: TeamService,
  ) {
    // this.teamService = teamService;
  }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.getAllTeams();
    return res.status(200).json(serviceResponse);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.getTeamById(Number(req.params.id));
    if (!serviceResponse) {
      return res.status(404).json({ message: 'Team not found ' });
    }
    return res.status(200).json(serviceResponse);
  }
}

export default TeamsController;
