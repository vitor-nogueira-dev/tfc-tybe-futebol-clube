import { ModelStatic } from 'sequelize';
import ILogin from '../Interfaces/ILogin';
import Users from '../database/models/UserModel';

class UsersService {
  constructor(private userModel: ModelStatic<Users>) {}

  async todoLogin(email: string): Promise<ILogin> {
    return this.userModel.findOne({
      where: { email },
    }) as unknown as ILogin;
  }
}

export default UsersService;
