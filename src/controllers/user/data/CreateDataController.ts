import { Request, Response } from 'express';

import AppError from '../../../error/AppError';

import CreateDataService from '../../../services/user/CreateDataService';

class CreateDataController {
  async createNote(request: Request, response: Response) {
    const { name, note_text, favorite, folder }: TNote = request.body;
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
    }: TCredential = request.body;
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
      password,
    }: TCard = request.body;
    const user_id = request.user.id;

    if (!name || !number || !flag || !security_code || !password) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const card = await userData.createCard({
      user_id,
      name,
      number,
      password,
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
    const { name }: TFolder = request.body;
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
