import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm';
import { Account } from "../entities/account.entity";
import { Movement } from "../entities/movement.entity";

@Injectable()
export class TransferService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Movement)
    private readonly movementRepository: Repository<Movement>,
  ) {}

  async transfer(from: string, to: string, amount: number) {
    return this.dataSource.transaction(async (manager) => {
      const accountFrom = await manager.findOne(Account, { where: { id: from } });
      const accountTo = await manager.findOne(Account, { where: { id: to } });

      if (!accountFrom || !accountTo) throw new Error('Account not found');
      if (Number(accountFrom.balance) < amount) throw new Error('Not enough balance');

      accountFrom.balance = Number(accountFrom.balance) - amount;
      accountTo.balance = Number(accountTo.balance) + amount;

      await manager.save(accountFrom);
      await manager.save(accountTo);

      const movement = manager.create(Movement, {
        accountFrom,
        accountTo,
        amount,
      });

      await manager.save(movement);

      return movement;
    });
  }
}