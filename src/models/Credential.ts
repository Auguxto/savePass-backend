import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('credentials')
class Credential {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @JoinColumn({ name: 'user' })
  @ManyToOne(() => User)
  user: User;

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
