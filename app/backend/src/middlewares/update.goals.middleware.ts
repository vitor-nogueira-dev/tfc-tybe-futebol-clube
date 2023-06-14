import { Request, Response, NextFunction } from 'express';

const updateGoalsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  return next();
};

export default updateGoalsMiddleware;
