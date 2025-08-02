import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferModule } from './transfer/transfer.module';
import { Account } from './entities/account.entity';
import { Movement } from './entities/movement.entity';
import * as process from "node:process";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Account, Movement],
      synchronize: false,
    }),

    TransferModule
  ]
})
export class AppModule {}
