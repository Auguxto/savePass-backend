import { EntityRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../error/AppError';

import Credential from '../models/Credential';

@EntityRepository(Credential)
class CredentialsRepository extends Repository<Credential> {
  async get(credential_id: string): Promise<Credential> {
    const isUuid = validate(credential_id);
    if (!isUuid) {
      throw new AppError('Invalid credential');
    }
    const credential = await this.findOne(credential_id, {
      select: ['id'],
      relations: ['user'],
    });
    if (credential) return credential;
    throw new AppError('Credential not found');
  }

  async getFull(credential_id: string): Promise<Credential> {
    const isUuid = validate(credential_id);
    if (!isUuid) {
      throw new AppError('Invalid credential');
    }

    const credential = await this.findOne(credential_id, {
      relations: ['user', 'folder'],
    });
    if (credential) return credential;
    throw new AppError('Credential not found');
  }
}

export default CredentialsRepository;
