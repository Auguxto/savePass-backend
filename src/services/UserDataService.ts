import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Note from '../models/Note';
import Credential from '../models/Credential';
import Card from '../models/Card';
import Folder from '../models/Folder';

import UsersRepository from '../repositories/UsersRepository';

interface ICreateNote {
  user_id: string;
  name: string;
  note_text: string;
  favorite?: boolean;
  folder?: string;
}

interface ICreateCredential {
  user_id: string;
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
}

interface ICreateCard {
  user_id: string;
  name: string;
  number: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
}

interface ICreateFolder {
  user_id: string;
  name: string;
}

interface IGetFolderData {
  folder_id: string;
  user_id: string;
}

class UserDataService {
  async createNote({
    user_id,
    name,
    note_text,
    favorite,
    folder,
  }: ICreateNote): Promise<Note> {
    const usersRepository = getCustomRepository(UsersRepository);
    const notesRepository = getRepository(Note);
    const foldersRepository = getRepository(Folder);

    let dFolder: Folder;

    if (folder) {
      try {
        dFolder = await foldersRepository.findOne(folder);
      } catch {
        throw new AppError('Invalid folder');
      }

      if (!dFolder) {
        throw new AppError('Folder not found');
      }
    }

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
      favorite,
      folder: dFolder,
    });

    await notesRepository.save(note);

    return note;
  }

  async createCredential({
    name,
    password,
    user_id,
    email,
    favorite,
    folder,
    note,
    telephone,
    username,
  }: ICreateCredential): Promise<Credential> {
    const usersRepository = getCustomRepository(UsersRepository);
    const credentialsRepository = getRepository(Credential);
    const foldersRepository = getRepository(Folder);

    let dFolder: Folder;

    if (folder) {
      try {
        dFolder = await foldersRepository.findOne(folder);
      } catch {
        throw new AppError('Invalid folder');
      }

      if (!dFolder) {
        throw new AppError('Folder not found');
      }
    }

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
      email,
      favorite,
      note,
      telephone,
      username,
      folder: dFolder,
    });

    await credentialsRepository.save(credential);

    return credential;
  }

  async createCard({
    name,
    number,
    flag,
    security_code,
    user_id,
    favorite,
    bank,
    folder,
    note,
  }: ICreateCard): Promise<Card> {
    const usersRepository = getCustomRepository(UsersRepository);
    const cardsRepository = getRepository(Card);
    const foldersRepository = getRepository(Folder);

    let dFolder: Folder;

    if (folder) {
      try {
        dFolder = await foldersRepository.findOne(folder);
      } catch {
        throw new AppError('Invalid folder');
      }

      if (!dFolder) {
        throw new AppError('Folder not found');
      }
    }

    const user = await usersRepository.findOne(user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const card = cardsRepository.create({
      user,
      name,
      number,
      security_code,
      flag,
      bank,
      favorite,
      note,
      folder: dFolder,
    });

    await cardsRepository.save(card);

    return card;
  }

  async createFolder(params: ICreateFolder): Promise<Folder> {
    const usersRepository = getCustomRepository(UsersRepository);
    const foldersRepository = getRepository(Folder);

    const user = await usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const folder = foldersRepository.create({
      user,
      ...params,
    });

    await foldersRepository.save(folder);

    return folder;
  }

  async getFolderData({ folder_id, user_id }: IGetFolderData): Promise<Folder> {
    const foldersRepository = getRepository(Folder);

    const folder = await foldersRepository.findOne(folder_id, {
      relations: ['user', 'notes', 'credentials', 'cards'],
    });

    if (!folder) {
      throw new AppError('Folder not found');
    }

    if (folder.user.id !== user_id) {
      throw new AppError('Unauthorized', 401);
    }

    return folder;
  }
}

export default UserDataService;
