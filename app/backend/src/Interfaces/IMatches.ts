interface IMatches extends IMatchesBody {
  id: number,
  inProgress: false,
  homeTeam: {
    teamName: string
  },
  awayTeam: {
    teamName: string
  }
}

export interface IMatchesBody {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface UpdateGols {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export default IMatches;
