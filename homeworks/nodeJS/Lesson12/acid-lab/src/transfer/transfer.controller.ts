import { Controller, Get, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {
  }

  @Get()
  sayHelloWorld() {
    return 'Hello World!';
  }

  @Post()
  @HttpCode(201)
  @ApiHeader({
    name: 'fromId',
    required: true,
  })
  @ApiHeader({
    name: 'toId',
    required: true,
  })
  @ApiHeader({
    name: 'amount',
    required: true,
  })
  async transfer(@Body() body: { fromId: string; toId: string; amount: number }) {
    try {
      const response = await this.transferService.transfer(body.fromId, body.toId, body.amount,);

      return { message: 'Success!', response};
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Failed!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}