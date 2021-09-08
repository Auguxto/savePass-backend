import AppError from '../../error/AppError';
import { encrypt } from '../../lib/Crypt';
import Credential from '../../models/Credential';
import Note from '../../models/Note';
import DataService from './DataService';

type UpdateNote = {
  name?: string;
  note?: string;
  folder?: string;
  favorite?: boolean;
};

type UpdateCredential = {
  folder?: string;
  name?: string;
  username?: string;
  email?: string;
  telephone?: string;
  password?: string;
  note?: string;
  favorite?: boolean;
};

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

    noteData.name = name ? name : noteData.name;
    noteData.note = encryptedNote;
    noteData.folder = folder ? folderData : noteData.folder;
    noteData.favorite = favorite ? favorite : noteData.favorite;

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

    credentialData.email = email ? email : credentialData.email;
    credentialData.favorite = favorite ? favorite : credentialData.favorite;
    credentialData.name = name ? name : credentialData.name;
    credentialData.note = note ? note : credentialData.note;
    credentialData.telephone = telephone ? telephone : credentialData.telephone;
    credentialData.username = username ? username : credentialData.username;
    credentialData.folder = folder ? folderData : credentialData.folder;
    credentialData.password = encryptedPassword;

    await this.credentialsRepository.save(credentialData);

    return credentialData;
  }
}

export default UpdateDataService;
