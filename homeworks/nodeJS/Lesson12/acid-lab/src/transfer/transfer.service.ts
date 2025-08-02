import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Account } from "../entities/account.entity";
import { Movement } from "../entities/movement.entity";

@Injectable()
export class TransferService {
  constructor(
    private db: DataSource,
  ) {}

  async getAccounts():Promise<Account[]> {
    return await this.db.getRepository(Account).find();
  }

  async transfer(from: string, to: string, amount: number):Promise<Movement> {
    return this.db.transaction(async (manager) => {
      const accountFrom = await manager.findOne(Account, { where: { id: from } });
      const accountTo = await manager.findOne(Account, { where: { id: to } });

      if (!accountFrom || !accountTo) throw new Error('Account not found');
      if (Number(accountFrom.balance) < amount) throw new Error('Not enough balance');

      accountFrom.balance = Number(accountFrom.balance) - amount;
      accountTo.balance = Number(accountTo.balance) + amount;

      await manager.save(accountFrom);
      await manager.save(accountTo);

      const movement = manager.create(Movement, {
        from: accountFrom,
        to: accountTo,
        amount,
      });

      await manager.save(movement);

      return movement;
    });
  }
}