import { getCustomRepository, getRepository, Repository } from 'typeorm';

import Card from '../../models/Card';

import CredentialsRepository from '../../repositories/CredentialsRepository';
import FoldersRepository from '../../repositories/FoldersRepository';
import NotesRepository from '../../repositories/NotesRepository';
import UsersRepository from '../../repositories/UsersRepository';

class DataService {
  usersRepository: UsersRepository;
  notesRepository: NotesRepository;
  foldersRepository: FoldersRepository;
  credentialsRepository: CredentialsRepository;
  cardsRepository: Repository<Card>;

  constructor() {
    this.notesRepository = getCustomRepository(NotesRepository);
    this.foldersRepository = getCustomRepository(FoldersRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
    this.credentialsRepository = getCustomRepository(CredentialsRepository);
    this.cardsRepository = getRepository(Card);
  }
}

export default DataService;
