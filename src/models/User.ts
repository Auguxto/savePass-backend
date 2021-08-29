import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Address from './Address';

import Info from './Info';

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

  @Column('uuid', { array: true })
  notes: string[];

  @Column('uuid', { array: true })
  folders: string[];

  @Column('uuid', { array: true })
  credentials: string[];

  @Column('uuid', { array: true })
  cards: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setDefaults(): Promise<void> {
    this.notes = [];
    this.folders = [];
    this.credentials = [];
    this.cards = [];
  }
}

export default User;
