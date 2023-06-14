import ISort from '../Interfaces/ISort';

const sortLeaderBoard = (a: ISort, b: ISort) => (
  b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || parseInt(b.goalsBalance, 10) - parseInt(a.goalsBalance, 10)
    || b.goalsFavor - a.goalsFavor
    || 0
);

export default sortLeaderBoard;
