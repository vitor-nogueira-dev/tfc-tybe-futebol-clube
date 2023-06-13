import { ModelStatic } from 'sequelize';
import ITeam from '../Interfaces/ITeam';
import Teams from '../database/models/TeamsModel';

class TeamService {
  constructor(
    private teamModel: ModelStatic<Teams>,
  ) { }

  public async getAllTeams(): Promise<ITeam[]> {
    return this.teamModel.findAll();
  }

  public async getTeamById(id: number): Promise<ITeam | boolean> {
    const team = await this.teamModel.findOne({ where: { id } });
    if (!team) {
      return false;
    }
    return team;
  }
}

export default TeamService;
