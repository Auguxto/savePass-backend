import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  infos: string;

  @Column()
  address: string;

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
