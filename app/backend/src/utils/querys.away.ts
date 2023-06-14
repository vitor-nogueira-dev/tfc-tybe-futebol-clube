import { ProjectionAlias, Sequelize } from 'sequelize';

const querysAway = {
  string1: `CAST(SUM(CASE WHEN 
    away_team_goals > home_team_goals 
    THEN 3 WHEN away_team_goals = home_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)`,
  string2: `CAST(SUM(CASE WHEN away_team_goals > home_team_goals THEN 1 ELSE 0 END) 
    AS UNSIGNED)`,
  string3: `CAST(SUM(CASE WHEN away_team_goals < home_team_goals THEN 1 ELSE 0 END)
     AS UNSIGNED)`,
  string4: `CAST(SUM(CASE WHEN away_team_goals = home_team_goals THEN 1 ELSE 0 END)
     AS UNSIGNED)`,
  string5: `CAST(SUM(CASE WHEN away_team_goals > 0 THEN away_team_goals ELSE 0 END)
     AS UNSIGNED)`,
  string6: `CAST(SUM(CASE WHEN home_team_goals > 0 THEN home_team_goals ELSE 0 END)
    AS UNSIGNED)`,
  string7: 'SUM(away_team_goals - home_team_goals)',
  string8: `ROUND((SUM(CASE WHEN away_team_goals > home_team_goals
      THEN 3 WHEN away_team_goals = home_team_goals THEN 1 ELSE 0 END) / 
      (COUNT(away_team_id)*3)) * 100, 2)`,
};

const atributesAway = [[Sequelize.col('awayTeam.team_name'), 'name'],
  [Sequelize.literal(querysAway.string1), 'totalPoints'],
  [Sequelize.fn('COUNT', Sequelize.col('away_team_id')), 'totalGames'],
  [Sequelize.literal(querysAway.string2), 'totalVictories'],
  [Sequelize.literal(querysAway.string4), 'totalDraws'],
  [Sequelize.literal(querysAway.string3), 'totalLosses'],
  [Sequelize.literal(querysAway.string5), 'goalsFavor'],
  [Sequelize.literal(querysAway.string6), 'goalsOwn'],
  [Sequelize.literal(querysAway.string7), 'goalsBalance'],
  [Sequelize.literal(querysAway.string8), 'efficiency']] as unknown as ProjectionAlias[];

export default atributesAway;
