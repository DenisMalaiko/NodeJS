import { Controller, Get, Post, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ZBody } from "../decorators/z-body.decorator";
import { TransferSchema, TransferDto } from "../dto/transfer.dto";
import { TransferService } from './transfer.service';
import { Account } from "../entities/account.entity";
import { Movement } from "../entities/movement.entity";

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {
  }

  @Get()
  async getAccounts() {
    try {
      const response: Account[] = await this.transferService.getAccounts();
      return { message: 'Success!', response};
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fromId: { type: 'string' },
        toId: { type: 'string' },
        amount: { type: 'number', minimum:0.01 },
      },
      required: ['fromId', 'toId', 'amount'],
    },
  })
  async transfer(@ZBody(TransferSchema) transfer: TransferDto) {
    try {
      const response: Movement = await this.transferService.transfer(transfer.fromId, transfer.toId, transfer.amount);
      return { message: 'Success!', response};
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}