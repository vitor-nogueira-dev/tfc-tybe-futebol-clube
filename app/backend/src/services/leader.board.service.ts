import { ModelStatic } from 'sequelize';
import attributes, { queryHome } from '../utils/querys.home';

import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

class LeaderBoardService {
  constructor(private leaderModel: ModelStatic<MatchesModel>) { }

  async getLeaderBoardHome(): Promise<object> {
    const resultLeaderBoardHome = await Promise.all(
      queryHome.ids.map(async (ele) => {
        const learderBoardHome = await this.leaderModel.findAll({
          where: { homeTeamId: ele, inProgress: 0 },
          include:
            [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['teamName', 'id'] } }],
          attributes,
          group: ['home_team_id', 'name'],
        });

        return learderBoardHome;
      }),
    );

    const resultArr = resultLeaderBoardHome.flatMap(([obj]) => obj);

    return resultArr as object;
  }
}

export default LeaderBoardService;
