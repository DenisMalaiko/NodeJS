import { Controller, Get, Post, Body, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
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
  async transfer(@Body() body: { fromId: string; toId: string; amount: number }) {
    try {
      const result = await this.transferService.transfer(
        body.fromId,
        body.toId,
        body.amount,
      );

      return {
        message: 'Transfer successful',
        result
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message || 'Transfer failed' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}