import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quizes')
export class Quiz {
  @PrimaryGeneratedColumn({
    comment: 'The quiz unique identifier',
  })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: 1 })
  isActive: boolean;
}
