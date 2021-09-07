import { Request, Response } from 'express';

import AppError from '../../../error/AppError';

import CreateDataService from '../../../services/user/CreateDataService';

type Note = {
  name: string;
  note_text: string;
  favorite?: boolean;
  folder?: string;
};

type Credential = {
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type Card = {
  name: string;
  number: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type Folder = {
  name: string;
};

class CreateDataController {
  async createNote(request: Request, response: Response) {
    const { name, note_text, favorite, folder }: Note = request.body;
    const user_id = request.user.id;

    if (!name || !note_text) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const note = await userData.createNote({
      user_id,
      name,
      note_text,
      folder,
      favorite,
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
      favorite,
      folder,
    }: Credential = request.body;
    const user_id = request.user.id;

    if (!name || !password) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const credential = await userData.createCredential({
      user_id,
      name,
      password,
      username,
      email,
      telephone,
      note,
      favorite,
      folder,
    });

    return response.json({ credential });
  }

  async createCard(request: Request, response: Response) {
    const {
      name,
      number,
      flag,
      bank,
      security_code,
      note,
      favorite,
      folder,
    }: Card = request.body;
    const user_id = request.user.id;

    if (!name || !number || !flag || !security_code) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const card = await userData.createCard({
      user_id,
      name,
      number,
      flag,
      bank,
      security_code,
      note,
      favorite,
      folder,
    });

    return response.json({ card });
  }

  async createFolder(request: Request, response: Response) {
    const { name }: Folder = request.body;
    const user_id = request.user.id;

    if (!name) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const folder = await userData.createFolder({
      user_id,
      name,
    });

    return response.json({ folder });
  }
}

export default CreateDataController;
