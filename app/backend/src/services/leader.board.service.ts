import { ModelStatic } from 'sequelize';
import attributesHome, { queryHome } from '../utils/querys.home';

import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import atributesAway from '../utils/querys.away';

class LeaderBoardService {
  constructor(private leaderModel: ModelStatic<MatchesModel>) { }

  async getLeaderBoardHome(): Promise<object> {
    const resultLeaderBoardHome = await Promise.all(
      queryHome.ids.map(async (ele) => {
        const learderBoardHome = await this.leaderModel.findAll({
          where: { homeTeamId: ele, inProgress: 0 },
          include:
            [{ model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['teamName', 'id'] } }],
          attributes: attributesHome,
          group: ['home_team_id', 'name'],
        });

        return learderBoardHome;
      }),
    );

    const resultArr = resultLeaderBoardHome.flatMap(([obj]) => obj);

    return resultArr as object;
  }

  async getLeaderBoardAway(): Promise<object> {
    const resultLeaderBoard = await Promise.all(queryHome.ids.map(async (ele) => {
      const leaderBoardAway = await this.leaderModel.findAll({
        where: { awayTeamId: ele, inProgress: 0 },
        include:
          [{ model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['teamName', 'id'] } }],
        attributes: atributesAway,
        group: ['away_team_id', 'name'],
      }); return leaderBoardAway;
    }));
    const resultArr = resultLeaderBoard.flatMap(([obj]) => obj);
    return resultArr as object;
  }
}

export default LeaderBoardService;
