import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../error/AppError';

import Note from '../models/Note';
import Credential from '../models/Credential';
import Card from '../models/Card';
import Folder from '../models/Folder';

import UsersRepository from '../repositories/UsersRepository';
import FoldersRepository from '../repositories/FoldersRepository';

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
  usersRepository = getCustomRepository(UsersRepository);
  notesRepository = getRepository(Note);
  foldersRepository = getCustomRepository(FoldersRepository);
  credentialsRepository = getRepository(Credential);
  cardsRepository = getRepository(Card);

  async createNote(params: ICreateNote): Promise<Note> {
    let dFolder = params.folder
      ? (await this.foldersRepository.exists(params.folder)).folder
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const note = this.notesRepository.create({
      ...params,
      user,
      note: params.note_text,
      folder: dFolder,
    });

    await this.notesRepository.save(note);
    return note;
  }

  async createCredential(params: ICreateCredential): Promise<Credential> {
    let dFolder = params.folder
      ? (await this.foldersRepository.exists(params.folder)).folder
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const credential = this.credentialsRepository.create({
      ...params,
      user,
      folder: dFolder,
    });

    await this.credentialsRepository.save(credential);
    return credential;
  }

  async createCard(params: ICreateCard): Promise<Card> {
    let dFolder = params.folder
      ? (await this.foldersRepository.exists(params.folder)).folder
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const card = this.cardsRepository.create({
      ...params,
      user,
      folder: dFolder,
    });

    await this.cardsRepository.save(card);
    return card;
  }

  async createFolder(params: ICreateFolder): Promise<Folder> {
    const usersRepository = getCustomRepository(UsersRepository);
    const foldersRepository = getRepository(Folder);

    const user = await usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const folder = foldersRepository.create({
      user,
      ...params,
    });

    await foldersRepository.save(folder);
    return folder;
  }

  async getFolderData({ folder_id, user_id }: IGetFolderData): Promise<Folder> {
    const foldersRepository = getCustomRepository(FoldersRepository);

    const folder = await foldersRepository.findOne(folder_id, {
      relations: ['user', 'notes', 'credentials', 'cards'],
    });

    if (!folder) {
      throw new AppError('Folder not found');
    } else if (folder.user.id !== user_id) {
      throw new AppError('Unauthorized', 401);
    }

    return folder;
  }
}

export default UserDataService;
