import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import AppError from '../error/AppError';

import UsersRepository from '../repositories/UsersRepository';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function isAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Invalid credencials', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as TokenPayload;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(sub);

    if (!user) {
      throw new AppError('Invalid credencials', 401);
    }

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid credencials', 401);
  }
}

export default isAuth;
