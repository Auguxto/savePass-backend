import { EntityRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../error/AppError';

import Folder from '../models/Folder';

@EntityRepository(Folder)
class FoldersRepository extends Repository<Folder> {
  public async exists(
    folder_id: string,
  ): Promise<{ exists: boolean; folder?: Folder }> {
    const isUuid = validate(folder_id);
    if (!isUuid) {
      throw new AppError('Invalid folder');
    }
    const folder = await this.findOne(folder_id, {
      select: ['id'],
    });
    if (folder) return { exists: true, folder };
    return { exists: false };
  }
}

export default FoldersRepository;
