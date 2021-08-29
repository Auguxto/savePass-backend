import { hash } from 'bcryptjs';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';
import Info from '../models/Info';

import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';

interface ICreate {
  email: string;
  password: string;
}

interface IUpdate {
  user_id: string;
  name: string;
  gender: string;
  age: number;
  telephone: string;
  birthday: Date;
}

class UserService {
  async create({ email, password }: ICreate): Promise<User> {
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

  async updateInfo({
    user_id,
    name,
    gender,
    age,
    telephone,
    birthday,
  }: IUpdate): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const infosRepository = getRepository(Info);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.infos) {
      user.infos = null;
    }

    const info = infosRepository.create({
      name,
      gender,
      age,
      telephone,
      birthday,
    });

    await infosRepository.save(info);

    user.infos = info;

    await usersRepository.save(user);

    return user;
  }
}

export default UserService;
