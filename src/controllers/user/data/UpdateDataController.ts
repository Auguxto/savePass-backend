import { Request, Response } from 'express';

import UpdateDataService from '../../../services/user/UpdateDataService';

import AppError from '../../../error/AppError';

class UpdateDataController {
  async updateNote(request: Request, response: Response) {
    const { id } = request.params;
    const params: TNote = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const note = await userData.updateNote(id, user_id, {
      ...params,
    });

    return response.json({ note });
  }

  async updateCredential(request: Request, response: Response) {
    const { id } = request.params;
    const params: TCredential = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const credential = await userData.updateCredential(id, user_id, {
      ...params,
    });

    return response.json({ credential });
  }

  async updateCard(request: Request, response: Response) {
    const { id } = request.params;
    const params: TCard = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const card = await userData.updateCard(id, user_id, {
      ...params,
    });

    return response.json({ card });
  }

  async updateFolder(request: Request, response: Response) {
    const { id } = request.params;
    const params: UpdateFolder = request.body;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new UpdateDataService();

    const folder = await userData.updateFolder(id, user_id, {
      ...params,
    });

    return response.json({ folder });
  }
}

export default UpdateDataController;
