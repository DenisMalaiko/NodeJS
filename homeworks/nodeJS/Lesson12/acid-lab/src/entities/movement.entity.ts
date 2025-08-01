import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,} from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, (account) => account.sentMovements)
  from: Account;

  @ManyToOne(() => Account, (account) => account.receivedMovements)
  to: Account;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}