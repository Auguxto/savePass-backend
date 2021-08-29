import { Request, Response } from 'express';

import AppError from '../error/AppError';

import UserDataService from '../services/UserDataService';

interface ICreateNote {
  name: string;
  note_text: string;
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

    return response.json(note);
  }
}

export default UserDataController;
