import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class MatchesController {
  constructor(private matchService: MatchesService) {
    this.matchService = matchService;
  }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAllMatches();
    if (!inProgress) return res.status(200).json(matches);
    const progress = inProgress === 'true';

    if (progress) {
      return res.status(200).json(await this.matchService.getProgressMatch(true));
    }
    return res.status(200).json(await this.matchService.getProgressMatch(false));
  }
}

export default MatchesController;
