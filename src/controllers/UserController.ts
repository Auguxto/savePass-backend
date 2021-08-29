import { Request, Response } from 'express';

import AppError from '../error/AppError';
import UserService from '../services/UserService';

interface Props {
  email: string;
  password: string;
}

class UserController {
  async create(request: Request, response: Response) {
    const { email, password }: Props = request.body;

    if (password.length <= 4) {
      throw new AppError('Password length has be bigger than 4');
    }

    const userService = new UserService();

    let user = await userService.create({ email, password });

    delete user.password;

    return response.json(user);
  }
}

export default UserController;
