import { Request, Response } from 'express';
import AppError from '../../../error/AppError';

import UpdateDataService from '../../../services/user/UpdateDataService';

class UpdateDataController {
  async updateNote(request: Request, response: Response) {
    const { id } = request.params;
    const { name, note_text, favorite, folder }: TNote = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const note = await userData.updateNote(id, user_id, {
      name,
      note: note_text,
      favorite,
      folder,
    });

    return response.json({ note });
  }

  async updateCredential(request: Request, response: Response) {
    const { id } = request.params;
    const {
      name,
      username,
      email,
      telephone,
      favorite,
      folder,
      note,
      password,
    }: TCredential = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const credential = await userData.updateCredential(id, user_id, {
      name,
      username,
      email,
      telephone,
      favorite,
      folder,
      note,
      password,
    });

    return response.json({ credential });
  }

  async updateCard(request: Request, response: Response) {
    const { id } = request.params;
    const {
      flag,
      name,
      number,
      password,
      security_code,
      bank,
      favorite,
      folder,
      note,
    }: TCard = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const card = await userData.updateCard(id, user_id, {
      bank,
      favorite,
      flag,
      folder,
      name,
      note,
      number,
      password,
      security_code,
    });

    return response.json({ card });
  }

  async updateFolder(request: Request, response: Response) {
    const { id } = request.params;
    const { name, favorite }: UpdateFolder = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const folder = await userData.updateFolder(id, user_id, {
      name,
      favorite,
    });

    return response.json({ folder });
  }
}

export default UpdateDataController;
