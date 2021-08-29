import { Request, Response } from 'express';

import UserSessionService from '../services/UserSessionService';

interface Props {
  email: string;
  password: string;
}

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password }: Props = request.body;

    const userSession = new UserSessionService();

    const { token, user } = await userSession.create({
      email,
      password,
    });

    return response.json({ token, user });
  }
}

export default SessionController;
