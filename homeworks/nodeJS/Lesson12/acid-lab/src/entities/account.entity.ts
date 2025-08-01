import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movement } from './movement.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => Movement, (movement) => movement.from)
  sentMovements: Movement[];

  @OneToMany(() => Movement, (movement) => movement.to)
  receivedMovements: Movement[];
}