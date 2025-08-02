import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('movements')
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.sentMovements)
  @JoinColumn({ name: 'from_id' })
  from: Account;

  @ManyToOne(() => Account, (account) => account.receivedMovements)
  @JoinColumn({ name: 'to_id' })
  to: Account;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}