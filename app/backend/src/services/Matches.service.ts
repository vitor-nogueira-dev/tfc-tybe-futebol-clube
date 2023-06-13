import { ModelStatic } from 'sequelize';
import IMatches from '../Interfaces/IMatches';
import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

class MatchesService {
  constructor(private matchesModel: ModelStatic<MatchesModel>) { }

  async getAllMatches(): Promise<IMatches[]> {
    const options = {
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };

    const matches = await this.matchesModel.findAll(options);

    return matches as IMatches[];
  }

  async getProgressMatch(progress: boolean): Promise<IMatches[]> {
    const options = {
      where: { inProgress: progress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    };

    const matches = await this.matchesModel.findAll(options);

    return matches as IMatches[];
  }
}

export default MatchesService;
