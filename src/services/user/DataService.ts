import { getCustomRepository, getRepository, Repository } from 'typeorm';
import Card from '../../models/Card';
import Credential from '../../models/Credential';
import FoldersRepository from '../../repositories/FoldersRepository';
import NotesRepository from '../../repositories/NotesRepository';
import UsersRepository from '../../repositories/UsersRepository';

class DataService {
  usersRepository: UsersRepository;
  notesRepository: NotesRepository;
  foldersRepository: FoldersRepository;
  credentialsRepository: Repository<Credential>;
  cardsRepository: Repository<Card>;

  constructor() {
    this.notesRepository = getCustomRepository(NotesRepository);
    this.foldersRepository = getCustomRepository(FoldersRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
    this.credentialsRepository = getRepository(Credential);
    this.cardsRepository = getRepository(Card);
  }
}

export default DataService;
