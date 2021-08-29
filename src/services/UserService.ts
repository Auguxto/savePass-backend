import { hash } from 'bcryptjs';
import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';
import Info from '../models/Info';

import User from '../models/User';
import Address from '../models/Address';

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

interface IUpdateAddress {
  user_id: string;
  country: string;
  state: string;
  city: string;
  road: string;
  district: string;
  number: number;
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
    const user = await usersRepository.findOne(user_id, {
      relations: ['infos'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.infos) {
      await infosRepository.remove(user.infos);
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

  async updateAddress({
    user_id,
    country,
    state,
    city,
    road,
    district,
    number,
  }: IUpdateAddress): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getRepository(Address);
    const user = await usersRepository.findOne(user_id, {
      relations: ['address'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.address) {
      await addressRepository.remove(user.address);
    }

    const address = addressRepository.create({
      country,
      state,
      city,
      road,
      district,
      number,
    });

    await addressRepository.save(address);

    user.address = address;

    await usersRepository.save(user);

    return user;
  }
}

export default UserService;
