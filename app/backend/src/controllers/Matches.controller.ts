import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  constructor(private matchService: MatchesService) {
    this.matchService = matchService;
  }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  }
}

export default MatchesController;
