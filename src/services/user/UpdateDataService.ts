import { encrypt } from '../../lib/Crypt';

import Credential from '../../models/Credential';
import Note from '../../models/Note';
import Card from '../../models/Card';

import DataService from './DataService';

import AppError from '../../error/AppError';

class UpdateDataService extends DataService {
  async updateNote(
    note_id: string,
    user_id: string,
    { name, favorite, folder, note }: UpdateNote,
  ): Promise<Note> {
    const noteData = await this.notesRepository.getFullNote(note_id);
    const user = await this.usersRepository.findOne(user_id);

    if (noteData.user.id !== user.id) {
      throw new AppError('Unauthorized', 401);
    }

    let folderData = folder ? await this.foldersRepository.get(folder) : null;

    const encryptedNote = note ? encrypt(note, user.id) : noteData.note;

    if (favorite === true) {
      noteData.favorite = true;
    } else if (favorite === false) {
      noteData.favorite = false;
    }

    noteData.name = name || noteData.name;
    noteData.note = encryptedNote;
    noteData.folder = folderData || noteData.folder;

    await this.notesRepository.save(noteData);

    return noteData;
  }

  async updateCredential(
    credential_id: string,
    user_id: string,
    {
      email,
      favorite,
      folder,
      name,
      note,
      password,
      telephone,
      username,
    }: UpdateCredential,
  ): Promise<Credential> {
    const credentialData = await this.credentialsRepository.getFullCredential(
      credential_id,
    );
    const user = await this.usersRepository.findOne(user_id);

    if (credentialData.user.id !== user.id) {
      throw new AppError('Unauthorized', 401);
    }

    let folderData = folder ? await this.foldersRepository.get(folder) : null;

    const encryptedPassword = password
      ? encrypt(password, user.id)
      : credentialData.password;

    if (favorite === true) {
      credentialData.favorite = true;
    } else if (favorite === false) {
      credentialData.favorite = false;
    }

    credentialData.email = email || credentialData.email;
    credentialData.name = name || credentialData.name;
    credentialData.note = note || credentialData.note;
    credentialData.telephone = telephone || credentialData.telephone;
    credentialData.username = username || credentialData.username;
    credentialData.folder = folderData || credentialData.folder;
    credentialData.password = encryptedPassword;

    await this.credentialsRepository.save(credentialData);

    return credentialData;
  }

  async updateCard(
    card_id: string,
    user_id: string,
    {
      bank,
      favorite,
      flag,
      folder,
      name,
      note,
      number,
      password,
      security_code,
    }: UpdateCard,
  ): Promise<Card> {
    const cardData = await this.cardsRepository.getFullCard(card_id);
    const user = await this.usersRepository.findOne(user_id);

    if (cardData.user.id !== user.id) {
      throw new AppError('Unauthorized', 401);
    }

    let folderData = folder ? await this.foldersRepository.get(folder) : null;

    const encryptedNumber = number ? encrypt(number, user.id) : cardData.number;
    const encryptedSecurityCode = security_code
      ? encrypt(security_code, user.id)
      : cardData.security_code;
    const encryptPassword = password
      ? encrypt(password, user.id)
      : cardData.password;

    if (favorite === true) {
      cardData.favorite = true;
    } else if (favorite === false) {
      cardData.favorite = false;
    }

    cardData.bank = bank || cardData.bank;
    cardData.flag = flag || cardData.flag;
    cardData.name = name || cardData.name;
    cardData.note = note || cardData.note;
    cardData.security_code = encryptedSecurityCode;
    cardData.number = encryptedNumber;
    cardData.password = encryptPassword;
    cardData.folder = folderData || cardData.folder;

    await this.cardsRepository.save(cardData);

    return cardData;
  }
}

export default UpdateDataService;
