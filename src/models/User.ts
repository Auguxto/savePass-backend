import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Address from './Address';
import Card from './Card';
import Credential from './Credential';

import Info from './Info';
import Note from './Note';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @JoinColumn({ name: 'infos' })
  @OneToOne(() => Info)
  infos: Info;

  @JoinColumn({ name: 'address' })
  @OneToOne(() => Address)
  address: Address;

  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @OneToMany(() => Credential, credential => credential.user)
  credentials: Credential[];

  @OneToMany(() => Card, card => card.user)
  cards: Card[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
