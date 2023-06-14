import { ModelStatic } from 'sequelize';
import IMatches, { IMatchesBody, UpdateGols } from '../Interfaces/IMatches';
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

  async finishMatch(id: number) {
    const [, rowsAffected] = await this.matchesModel.update(
      { inProgress: false },
      { where: { id }, returning: true },
    );
    console.log(rowsAffected, 'rowsAffected');

    if (+rowsAffected === 0) {
      return null;
    }
  }

  async changeMatch(id: number, updateGols: UpdateGols) {
    const [, rowsAffected] = await this.matchesModel.update(
      updateGols,
      { where: { id }, returning: true },
    );

    if (+rowsAffected === 0) {
      return null;
    }
  }

  async createMatch(newMatch: IMatchesBody) {
    const match = { ...newMatch, inProgress: true };
    const created = await this.matchesModel.create(match);
    return this.matchesModel.findOne({ where: { id: created.dataValues.id } });
  }
}

export default MatchesService;
