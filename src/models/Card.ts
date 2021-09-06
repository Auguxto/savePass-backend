import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';
import Folder from './Folder';

@Entity('cards')
class Card {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User)
  user: User;

  @JoinColumn({ name: 'folder' })
  @OneToMany(() => Folder, folder => folder.user)
  folder: Folder;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  flag: string;

  @Column()
  bank: string;

  @Column()
  security_code: string;

  @Column()
  note: string;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Card;
