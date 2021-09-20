import { encrypt } from '../../lib/Crypt';

import Note from '../../models/Note';
import Card from '../../models/Card';
import Folder from '../../models/Folder';
import Credential from '../../models/Credential';

import DataService from './DataService';

class CreateDataService extends DataService {
  async createNote(params: TNote): Promise<Note> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const encryptedNote = encrypt(params.note, user.id);

    const note = this.notesRepository.create({
      ...params,
      user,
      note: encryptedNote,
      folder: dFolder,
    });

    await this.notesRepository.save(note);

    return note;
  }

  async createCredential(params: TCredential): Promise<Credential> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const password = encrypt(params.password, user.id);

    const credential = this.credentialsRepository.create({
      ...params,
      user,
      password,
      folder: dFolder,
    });

    await this.credentialsRepository.save(credential);
    return credential;
  }

  async createCard(params: TCard): Promise<Card> {
    let dFolder = params.folder
      ? await this.foldersRepository.get(params.folder)
      : null;

    const user = await this.usersRepository.findOne(params.user_id, {
      select: ['id'],
    });

    const number = encrypt(params.number, user.id);
    const security_code = encrypt(params.security_code, user.id);
    const password = encrypt(params.password, user.id);

    const card = this.cardsRepository.create({
      ...params,
      user,
      number,
      password,
      security_code,
      folder: dFolder,
    });

    await this.cardsRepository.save(card);
    return card;
  }

  async createFolder(params: TFolder): Promise<Folder> {
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
