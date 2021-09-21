import DataService from './DataService';

import Credential from '../../models/Credential';
import Folder from '../../models/Folder';
import Note from '../../models/Note';
import Card from '../../models/Card';

import { decrypt } from '../../lib/Crypt';
import checkUserId from '../../lib/CheckUser';

class GetDataService extends DataService {
  async getCredential(
    user_id: string,
    credential_id: string,
  ): Promise<Credential> {
    const credential = await this.credentialsRepository.getFull(credential_id);

    checkUserId(credential.user.id, user_id);

    const decrypted = decrypt(credential.password, user_id);

    credential.password = decrypted;

    return credential;
  }

  async getCard(user_id: string, card_id: string): Promise<Card> {
    const card = await this.cardsRepository.getFull(card_id);

    checkUserId(card.user.id, user_id);

    const decrypted = decrypt(card.password, user_id);

    card.password = decrypted;

    return card;
  }

  async getNote(user_id: string, note_id: string): Promise<Note> {
    const note = await this.notesRepository.getFull(note_id);

    checkUserId(note.user.id, user_id);

    const decrypted = decrypt(note.note, user_id);

    note.note = decrypted;

    return note;
  }

  async getFolder(user_id: string, folder_id: string): Promise<Folder> {
    const folder = await this.foldersRepository.getFull(folder_id);

    checkUserId(folder.user.id, user_id);

    return folder;
  }
}

export default GetDataService;
