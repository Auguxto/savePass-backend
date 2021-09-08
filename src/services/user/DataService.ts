import { getCustomRepository } from 'typeorm';

import CredentialsRepository from '../../repositories/CredentialsRepository';
import FoldersRepository from '../../repositories/FoldersRepository';
import NotesRepository from '../../repositories/NotesRepository';
import UsersRepository from '../../repositories/UsersRepository';
import CardsRepository from '../../repositories/CardsRepository';

class DataService {
  usersRepository: UsersRepository;
  notesRepository: NotesRepository;
  foldersRepository: FoldersRepository;
  credentialsRepository: CredentialsRepository;
  cardsRepository: CardsRepository;

  constructor() {
    this.notesRepository = getCustomRepository(NotesRepository);
    this.foldersRepository = getCustomRepository(FoldersRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
    this.credentialsRepository = getCustomRepository(CredentialsRepository);
    this.cardsRepository = getCustomRepository(CardsRepository);
  }
}

export default DataService;
