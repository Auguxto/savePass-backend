import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Note from '../models/Note';
import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';

interface ICreateNote {
  user_id: string;
  name: string;
  note_text: string;
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
}

export default UserDataService;
