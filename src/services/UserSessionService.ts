import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import AppError from '../error/AppError';

import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';

interface Props {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: User;
}

class UserSessionService {
  public async create({ email, password }: Props): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      where: [{ email }],
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid username/password combination', 401);
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    delete user.password;

    return {
      token,
      user,
    };
  }
}

export default UserSessionService;
