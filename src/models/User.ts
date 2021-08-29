import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Address from './Address';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
