const matches = [
  {
    "id": 9,
    "homeTeamId": 1,
    "homeTeamGoals": 0,
    "awayTeamId": 12,
    "awayTeamGoals": 3,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Avaí/Kindermann"
    },
    "awayTeam": {
      "teamName": "Palmeiras"
    }
  },
  {
    "id": 17,
    "homeTeamId": 1,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 3,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Avaí/Kindermann"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
];

export const matchesInProgress = [
  {
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: true,
  }
]

export const allMatches = [
  {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  }
]

export const updateGoals = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}


export default matches;

