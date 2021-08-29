import { Request, Response } from 'express';

import AppError from '../error/AppError';
import UserService from '../services/UserService';

interface ICreate {
  email: string;
  password: string;
}

interface IUpdateInfo {
  name: string;
  gender: string;
  age: number;
  telephone: string;
  birthday: Date;
}

interface IUpdateAddress {
  country: string;
  state: string;
  city: string;
  road: string;
  district: string;
  number: number;
}

class UserController {
  async create(request: Request, response: Response) {
    const { email, password }: ICreate = request.body;

    if (!email || !password) {
      throw new AppError('Invalid request');
    }

    if (password.length <= 4) {
      throw new AppError('Password length has be bigger than 4');
    }

    const userService = new UserService();

    let user = await userService.create({ email, password });

    delete user.password;

    return response.json(user);
  }

  async updateInfo(request: Request, response: Response) {
    const { name, gender, age, telephone, birthday }: IUpdateInfo =
      request.body;
    const user_id = request.user.id;

    if (!name || !gender || !age || !telephone || !birthday) {
      throw new AppError('Invalid request');
    }

    const userService = new UserService();

    let user = await userService.updateInfo({
      user_id,
      name,
      gender,
      age,
      telephone,
      birthday,
    });

    return response.json({ user });
  }

  async updateAddress(request: Request, response: Response) {
    const { country, state, city, road, district, number }: IUpdateAddress =
      request.body;
    const user_id = request.user.id;

    if (!country || !state || !city || !road || !district || !number) {
      throw new AppError('Invalid request');
    }

    const userService = new UserService();

    let user = await userService.updateAddress({
      user_id,
      country,
      state,
      city,
      road,
      district,
      number,
    });

    return response.json({ user });
  }
}

export default UserController;
