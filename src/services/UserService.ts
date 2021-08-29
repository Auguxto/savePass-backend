import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import AppError from '../error/AppError';

import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';

interface Props {
  email: string;
  password: string;
}

class UserService {
  async create({ email, password }: Props): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const exists = await usersRepository.exists(email);

    if (exists) {
      throw new AppError('User already exists', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default UserService;
