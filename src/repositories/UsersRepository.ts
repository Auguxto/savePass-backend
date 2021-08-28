import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async exists(email: string): Promise<boolean> {
    const user = await this.findOne({
      where: { email },
    });

    if (user) {
      return true;
    }

    return false;
  }
}

export default UsersRepository;
