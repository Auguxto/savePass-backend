import { EntityRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import Folder from '../models/Folder';

import AppError from '../error/AppError';

@EntityRepository(Folder)
class FoldersRepository extends Repository<Folder> {
  public async get(folder_id: string): Promise<Folder> {
    const isUuid = validate(folder_id);
    if (!isUuid) {
      throw new AppError('Invalid folder');
    }
    const folder = await this.findOne(folder_id, {
      select: ['id', 'name', 'favorite', 'cards', 'notes', 'credentials'],
      relations: ['user'],
    });
    if (folder) return folder;
    throw new AppError('Folder not found');
  }
}

export default FoldersRepository;
