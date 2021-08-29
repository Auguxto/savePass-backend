import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Note from '../models/Note';
import User from '../models/User';
import Credential from '../models/Credential';

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

  async createCredential({
    user_id,
    name,
    password,
    username,
    email,
    telephone,
    note,
  }: ICreateCredential): Promise<Credential> {
    const usersRepository = getCustomRepository(UsersRepository);
    const credentialsRepository = getRepository(Credential);

    const user = await usersRepository.findOne(user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const credential = credentialsRepository.create({
      user,
      name,
      password,
      username,
      email,
      telephone,
      note,
    });

    await credentialsRepository.save(credential);

    return credential;
  }
}

export default UserDataService;
