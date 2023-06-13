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
}

export default TeamService;
