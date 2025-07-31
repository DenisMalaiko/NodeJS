import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TransferService {
  constructor(
    private dataSource: DataSource,
  ) {}

  async transfer(from: string, to: string, amount: number) {
    console.log("START TRANSFER")
    console.log(from, to, amount);
    console.log("----------")

    return from + to + amount;
  }
}