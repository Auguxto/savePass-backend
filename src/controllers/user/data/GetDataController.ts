import { Request, Response } from 'express';

import GetDataService from '../../../services/user/GetDataService';

import AppError from '../../../error/AppError';

class GetDataController {
  async getCredential(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new GetDataService();

    const credential = await userData.getCredential(user_id, id);

    return response.json({ credential });
  }

  async getCard(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new GetDataService();

    const card = await userData.getCard(user_id, id);

    return response.json({ card });
  }

  async getNote(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new GetDataService();

    const note = await userData.getNote(user_id, id);

    return response.json({ note });
  }

  async getFolder(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = request.user.id;

    if (!id) {
      throw new AppError('Invalid request');
    }

    const userData = new GetDataService();

    const folder = await userData.getFolder(user_id, id);

    return response.json({ folder });
  }
}

export default GetDataController;
