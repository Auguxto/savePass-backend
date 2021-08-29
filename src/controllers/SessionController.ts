import { Request, Response } from 'express';

import UserSession from '../services/UserSession';

interface Props {
  email: string;
  password: string;
}

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password }: Props = request.body;

    const userSession = new UserSession();

    const { token, user } = await userSession.create({
      email,
      password,
    });

    return response.json({ token, user });
  }
}

export default SessionController;
