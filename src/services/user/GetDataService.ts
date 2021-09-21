import DataService from './DataService';
import { decrypt } from '../../lib/Crypt';

import Credential from '../../models/Credential';
import Folder from '../../models/Folder';
import Note from '../../models/Note';
import Card from '../../models/Card';

import AppError from '../../error/AppError';

class GetDataService extends DataService {
  async getCredential(
    user_id: string,
    credential_id: string,
  ): Promise<Credential> {
    const credential = await this.credentialsRepository.getFull(credential_id);

    if (credential.user.id != user_id) {
      throw new AppError('Unauthorized', 401);
    }

    const decrypted = decrypt(credential.password, user_id);

    credential.password = decrypted;

    return credential;
  }

  async getCard(user_id: string, card_id: string): Promise<Card> {
    const card = await this.cardsRepository.getFull(card_id);

    if (card.user.id != user_id) {
      throw new AppError('Unauthorized', 401);
    }

    const decrypted = decrypt(card.password, user_id);

    card.password = decrypted;

    return card;
  }

  async getNote(user_id: string, note_id: string): Promise<Note> {
    const note = await this.notesRepository.getFull(note_id);

    if (note.user.id != user_id) {
      throw new AppError('Unauthorized', 401);
    }

    const decrypted = decrypt(note.note, user_id);

    note.note = decrypted;

    return note;
  }

  async getFolder(user_id: string, folder_id: string): Promise<Folder> {
    const folder = await this.foldersRepository.getFull(folder_id);

    if (folder.user.id != user_id) {
      throw new AppError('Unauthorized', 401);
    }

    return folder;
  }
}

export default GetDataService;
