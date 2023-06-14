const generateLeaderBoardData = (length: number, arr: any[]) =>
  arr.slice(0, length).map(([first, second]) => {
    // console.log(first, 'first', second, 'second');
    const leaderBoard = {
      name: first.name,
      totalPoints: first.totalPoints + second.totalPoints,
      totalGames: first.totalGames + second.totalGames,
      totalVictories: first.totalVictories + second.totalVictories,
      totalDraws: first.totalDraws + second.totalDraws,
      totalLosses: first.totalLosses + second.totalLosses,
      goalsFavor: first.goalsFavor + second.goalsFavor,
      goalsOwn: first.goalsOwn + second.goalsOwn,
      goalsBalance: (parseInt(first.goalsBalance, 10)
      + parseInt(second.goalsBalance, 10)).toString(),
      efficiency: (((first.totalPoints + second.totalPoints)
      / ((first.totalGames + second.totalGames) * 3)) * 100).toFixed(2),
    };
    // console.log(leaderBoard, 'leaderBoard');
    return leaderBoard;
  });

export default generateLeaderBoardData;
