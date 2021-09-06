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
import Note from './Note';
import Card from './Card';
import Credential from './Credential';

@Entity('folders')
class Folder {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Note, note => note.folder)
  notes: Note[];

  @OneToMany(() => Credential, credential => credential.folder)
  credentials: Credential[];

  @OneToMany(() => Card, card => card.folder)
  cards: Card[];

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
