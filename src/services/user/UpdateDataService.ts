import AppError from '../../error/AppError';
import { encrypt } from '../../lib/Crypt';
import Note from '../../models/Note';
import DataService from './DataService';

type UpdateNote = {
  name?: string;
  note?: string;
  folder?: string;
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
}

export default UpdateDataService;
