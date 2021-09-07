import { getCustomRepository, getRepository, Repository } from 'typeorm';

import Note from '../../models/Note';
import Card from '../../models/Card';
import Folder from '../../models/Folder';

import UsersRepository from '../../repositories/UsersRepository';
import FoldersRepository from '../../repositories/FoldersRepository';
import Credential from '../../models/Credential';

type INote = {
  user_id: string;
  name: string;
  note_text: string;
  favorite?: boolean;
  folder?: string;
};

type ICredential = {
  user_id: string;
  name: string;
  password: string;
  username?: string;
  email?: string;
  telephone?: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type ICard = {
  user_id: string;
  name: string;
  number: string;
  flag: string;
  bank?: string;
  security_code: string;
  note?: string;
  favorite?: boolean;
  folder?: string;
};

type IFolder = {
  user_id: string;
  name: string;
};

class CreateDataService {
  usersRepository: UsersRepository;
  notesRepository: Repository<Note>;
  foldersRepository: FoldersRepository;
  credentialsRepository: Repository<Credential>;
  cardsRepository: Repository<Card>;

  constructor() {
    this.notesRepository = getRepository(Note);
    this.foldersRepository = getCustomRepository(FoldersRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
    this.credentialsRepository = getRepository(Credential);
    this.cardsRepository = getRepository(Card);
  }

  async createNote(params: INote): Promise<Note> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
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

  async createCredential(params: ICredential): Promise<Credential> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
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

  async createCard(params: ICard): Promise<Card> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
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

  async createFolder(params: IFolder): Promise<Folder> {
    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const folder = this.foldersRepository.create({
      user,
      ...params,
    });

    await this.foldersRepository.save(folder);
    return folder;
  }
}

export default CreateDataService;
