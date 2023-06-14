import { Request, Response } from 'express';
import LeaderBoardService from '../services/leader.board.service';
import sortLeaderBoard from '../utils/sort.learder';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import generateLeaderBoardData from '../utils/generate.leader.board.data';

export default class UsersController {
  constructor(private leader: LeaderBoardService) { this.leader = leader; }

  async getLeaderBoardHome(_req: Request, res: Response): Promise<object> {
    const leaderBoard = await this.leader.getLeaderBoardHome();

    const leaderBoardResultHome = JSON.parse(JSON.stringify(leaderBoard));

    leaderBoardResultHome.sort(sortLeaderBoard);

    return res.status(200).json(leaderBoardResultHome);
  }

  async getLeadeerBoardAway(_req: Request, res: Response): Promise<object> {
    const leaderBoard = await this.leader.getLeaderBoardAway();

    const leaderBoardResultAway = JSON.parse(JSON.stringify(leaderBoard));

    leaderBoardResultAway.sort(sortLeaderBoard);

    return res.status(200).json(leaderBoardResultAway);
  }

  async getLeaderBoardAll(_req: Request, res: Response): Promise<object> {
    const leaderBoardHome = JSON.parse(JSON.stringify(await this.leader.getLeaderBoardHome()));
    const leaderBoardAway = JSON.parse(JSON.stringify(await this.leader.getLeaderBoardAway()));

    const arrLeaderBoard = leaderBoardAway
      .map((ele:ILeaderBoard) => leaderBoardHome.concat(leaderBoardAway)
        .filter((ele2:ILeaderBoard) => ele2.name === ele.name));
    // console.log(arrLeaderBoard, 'arrLeaderBoard');

    const leaderBoardData = generateLeaderBoardData(arrLeaderBoard.length, arrLeaderBoard);

    leaderBoardData.sort(sortLeaderBoard);

    return res.status(200).json(leaderBoardData);
  }
}
