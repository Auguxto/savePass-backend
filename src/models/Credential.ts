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

@Entity('credentials')
class Credential {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User)
  user: User;

  @JoinColumn({ name: 'folder' })
  @ManyToOne(() => Folder)
  folder: Folder;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  password: string;

  @Column()
  note: string;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Credential;
