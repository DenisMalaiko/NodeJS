import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ProfilesModule } from './profiles.module';

describe('ProfilesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProfilesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /profiles valid body -> 201 + JSON ', async () => {
    const res = await request(app.getHttpServer())
      .post('/profiles')
      .send({
        email: 'test@example.com',
        displayName: 'John Doe',
        age: 25,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test@example.com');
    expect(res.body.displayName).toBe('John Doe');
    expect(res.body.age).toBe(25);
  });

  it('POST /profiles non valid email → 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/profiles')
      .send({
        email: 'not-an-email',
        displayName: 'John Doe',
        age: 25,
      })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining(['email must be an email']),
    );
  });

  it('POST /profiles → predicted fields', async () => {
    const res = await request(app.getHttpServer())
      .post('/profiles')
      .send({
        email: 'valid@example.com',
        displayName: 'Jane',
        age: 30,
      })
      .expect(201);

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(['id', 'email', 'displayName', 'age']),
    );
  });
});
