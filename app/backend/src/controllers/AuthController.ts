import { Request, Response } from 'express';
import { validateToken } from '../utils/auth';

class AuthController {
  static async login(req: Request, res: Response): Promise<object | void> {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }
    const role = validateToken(authorization);
    return res.status(200).json({ role: JSON.parse(JSON.stringify(role)).role });
  }
}

export default AuthController;
