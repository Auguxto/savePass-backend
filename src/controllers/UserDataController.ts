import { Request, Response } from 'express';

import AppError from '../error/AppError';

import UserDataService from '../services/UserDataService';

interface ICreateNote {
  name: string;
  note_text: string;
}

interface ICreateCredential {
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
}

interface ICreateCard {
  name: string;
  number: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
}

class UserDataController {
  async createNote(request: Request, response: Response) {
    const { name, note_text }: ICreateNote = request.body;
    const user_id = request.user.id;

    if (!name || !note_text) {
      throw new AppError('Invalid request');
    }

    const userData = new UserDataService();

    const note = await userData.createNote({
      user_id,
      name,
      note_text,
    });

    return response.json({ note });
  }

  async createCredential(request: Request, response: Response) {
    const {
      name,
      password,
      username,
      email,
      telephone,
      note,
    }: ICreateCredential = request.body;
    const user_id = request.user.id;

    if (!name || !password) {
      throw new AppError('Invalid request');
    }

    const userData = new UserDataService();

    const credential = await userData.createCredential({
      user_id,
      name,
      password,
      username,
      email,
      telephone,
      note,
    });

    return response.json({ credential });
  }

  async createCard(request: Request, response: Response) {
    const { name, number, flag, bank, security_code, note }: ICreateCard =
      request.body;
    const user_id = request.user.id;

    if (!name || !number || !flag || !security_code) {
      throw new AppError('Invalid request');
    }

    const userData = new UserDataService();

    const card = await userData.createCard({
      user_id,
      name,
      number,
      flag,
      bank,
      security_code,
      note,
    });

    return response.json({ card });
  }
}

export default UserDataController;
