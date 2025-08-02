import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Account } from '../src/entities/account.entity';
import { Movement } from '../src/entities/movement.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Transfer (e2e)', () => {
  let app: INestApplication<App>;
  let accountRepo: Repository<Account>;
  let movementRepo: Repository<Movement>;

  const fromId = '11111111-1111-1111-1111-111111111111';
  const toId = '22222222-2222-2222-2222-222222222222';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accountRepo = moduleFixture.get(getRepositoryToken(Account));
    movementRepo = moduleFixture.get(getRepositoryToken(Movement));

    await movementRepo.createQueryBuilder().delete().execute();
    await accountRepo.createQueryBuilder().delete().execute();

    await accountRepo.insert([
      { id: fromId, balance: 1000 },
      { id: toId, balance: 2000 },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('Test balance', async () => {
    await request(app.getHttpServer())
      .post('/transfer')
      .send({ fromId, toId, amount: 10000 })
      .expect(400);

    const from = await accountRepo.findOneBy({ id: fromId });
    const to = await accountRepo.findOneBy({ id: toId });
    const movements = await movementRepo.find();

    expect(Number(from?.balance)).toBe(1000);
    expect(Number(to?.balance)).toBe(2000);
    expect(movements.length).toBe(0);
  });
});
