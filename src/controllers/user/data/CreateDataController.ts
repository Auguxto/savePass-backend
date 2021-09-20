import { Request, Response } from 'express';

import AppError from '../../../error/AppError';

import CreateDataService from '../../../services/user/CreateDataService';

class CreateDataController {
  async createNote(request: Request, response: Response) {
    const params: TNote = request.body;
    const user_id = request.user.id;

    if (!params.name || !params.note) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const note = await userData.createNote({
      user_id,
      ...params,
    });

    return response.json({ note });
  }

  async createCredential(request: Request, response: Response) {
    const params: TCredential = request.body;
    const user_id = request.user.id;

    if (!params.name || !params.password) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const credential = await userData.createCredential({
      user_id,
      ...params,
    });

    return response.json({ credential });
  }

  async createCard(request: Request, response: Response) {
    const params: TCard = request.body;
    const user_id = request.user.id;

    if (
      !params.name ||
      !params.number ||
      !params.flag ||
      !params.security_code ||
      !params.password
    ) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const card = await userData.createCard({
      user_id,
      ...params,
    });

    return response.json({ card });
  }

  async createFolder(request: Request, response: Response) {
    const params: TFolder = request.body;
    const user_id = request.user.id;

    if (!params.name) {
      throw new AppError('Invalid request');
    }

    const userData = new CreateDataService();

    const folder = await userData.createFolder({
      user_id,
      ...params,
    });

    return response.json({ folder });
  }
}

export default CreateDataController;
