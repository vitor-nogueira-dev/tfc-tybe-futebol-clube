import jwt = require('jsonwebtoken');
import { SignOptions } from 'jsonwebtoken';
import JwtPayload from '../Interfaces/JwtPayload';

const secretKey: string = process.env.JWT_SECRET || 'secret';

const configJWT: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  return token;
};

const validateToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) { return false; }
};

export { generateToken, validateToken };
