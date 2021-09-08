import { EntityRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import AppError from '../error/AppError';

import Card from '../models/Card';

@EntityRepository(Card)
class CardsRepository extends Repository<Card> {
  async get(card_id: string): Promise<Card> {
    const isUuid = validate(card_id);
    if (!isUuid) {
      throw new AppError('Invalid card');
    }
    const card = await this.findOne(card_id, {
      select: ['id'],
    });
    if (card) return card;
    throw new AppError('Card not found');
  }

  async getFullCard(card_id: string): Promise<Card> {
    const isUuid = validate(card_id);
    if (!isUuid) {
      throw new AppError('Invalid card');
    }

    const card = await this.findOne(card_id, {
      relations: ['user', 'folder'],
      select: [
        'id',
        'bank',
        'name',
        'note',
        'number',
        'flag',
        'favorite',
        'security_code',
        'updated_at',
        'created_at',
      ],
    });
    if (card) return card;
    throw new AppError('Card not found');
  }
}

export default CardsRepository;
