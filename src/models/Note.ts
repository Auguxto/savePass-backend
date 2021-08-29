import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notes')
class Note {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Note;
