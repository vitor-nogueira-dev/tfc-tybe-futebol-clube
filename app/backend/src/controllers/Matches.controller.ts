import { Request, Response } from 'express';
import validateMatch from '../services/validations/matchValidate';
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

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log(id, 'id controller');

    await this.matchService.finishMatch(Number(id));
    // if (!match) return res.status(404).json({ message: 'Match not found' });

    return res.status(200).json({ message: 'Finished' });
  }

  async changeMatch(req: Request, res: Response): Promise<Response> {
    const updateGoals = req.body;
    const { id } = req.params;

    await this.matchService.changeMatch(Number(id), updateGoals);

    // if (!match) return res.status(404).json({ message: 'Match not found' });

    return res.status(200).json({ message: 'Updated' });
  }

  async createMatch(req: Request, res: Response): Promise<Response> {
    const newMatch = req.body;
    console.log(newMatch, 'newMatch');

    const validate = validateMatch(newMatch);
    if (validate) { return res.status(validate.status).json({ message: validate.message }); }

    const match = await this.matchService.createMatch(newMatch);

    return res.status(201).json(match);
  }
}

export default MatchesController;
