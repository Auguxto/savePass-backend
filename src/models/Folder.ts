import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('folders')
class Folder {
  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Folder;
