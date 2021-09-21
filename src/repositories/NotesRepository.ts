import { EntityRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../error/AppError';

import Note from '../models/Note';

@EntityRepository(Note)
class NotesRepository extends Repository<Note> {
  async get(note_id: string): Promise<Note> {
    const isUuid = validate(note_id);
    if (!isUuid) {
      throw new AppError('Invalid note');
    }
    const note = await this.findOne(note_id, {
      select: ['id'],
    });
    if (note) return note;
    throw new AppError('Note not found');
  }

  async getFull(note_id: string): Promise<Note> {
    const isUuid = validate(note_id);
    if (!isUuid) {
      throw new AppError('Invalid note');
    }

    const note = await this.findOne(note_id, {
      relations: ['user', 'folder'],
    });
    if (note) return note;
    throw new AppError('Note not found');
  }
}

export default NotesRepository;
