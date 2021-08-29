import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Note from '../models/Note';
import Credential from '../models/Credential';
import Card from '../models/Card';

import UsersRepository from '../repositories/UsersRepository';

interface ICreateNote {
  user_id: string;
  name: string;
  note_text: string;
}

interface ICreateCredential {
  user_id: string;
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
}

interface ICreateCard {
  user_id: string;
  name: string;
  number: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
}

class UserDataService {
  async createNote({ user_id, name, note_text }: ICreateNote): Promise<Note> {
    const usersRepository = getCustomRepository(UsersRepository);
    const notesRepository = getRepository(Note);

    const user = await usersRepository.findOne(user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const note = notesRepository.create({
      user,
      name,
      note: note_text,
    });

    await notesRepository.save(note);

    return note;
  }

  async createCredential(params: ICreateCredential): Promise<Credential> {
    const usersRepository = getCustomRepository(UsersRepository);
    const credentialsRepository = getRepository(Credential);

    const user = await usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const credential = credentialsRepository.create({
      user,
      ...params,
    });

    await credentialsRepository.save(credential);

    return credential;
  }

  async createCard(params: ICreateCard): Promise<Card> {
    const usersRepository = getCustomRepository(UsersRepository);
    const cardsRepository = getRepository(Card);

    const user = await usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const card = cardsRepository.create({
      user,
      ...params,
    });

    await cardsRepository.save(card);

    return card;
  }
}

export default UserDataService;
