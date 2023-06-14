import { Request, Response } from 'express';
import LeaderBoardService from '../services/leader.board.service';
import sortLeaderBoard from '../utils/sort.learder';

export default class UsersController {
  constructor(private leader: LeaderBoardService) { this.leader = leader; }

  async getLeaderBoardHome(_req: Request, res: Response): Promise<object> {
    const leaderBoard = await this.leader.getLeaderBoardHome();

    const leaderBoardResultHome = JSON.parse(JSON.stringify(leaderBoard));

    leaderBoardResultHome.sort(sortLeaderBoard);

    return res.status(200).json(leaderBoardResultHome);
  }
}
