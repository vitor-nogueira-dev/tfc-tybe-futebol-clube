import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import UserService from '../services/User.service';
import { validateFieldsLogin } from '../services/validations/loginValidate';
import { generateToken } from '../utils/auth';

export default class UsersController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async todoLogin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const validate = validateFieldsLogin(email, password);
    if (validate) {
      return res.status(validate.status).json({ message: validate.message });
    }
    const getLogin = await this.userService.todoLogin(email);
    if (!getLogin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const verifyPassword = bcrypt.compareSync(password, getLogin.password);
    if (!verifyPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const payload = { email: getLogin.email, role: getLogin.role };
    const token = generateToken(payload);
    return res.status(200).json({ token });
  }
}
