import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZipService } from './zip.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('zip')
@Controller()
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Post('zip')
  @UseInterceptors(FileInterceptor('zip', { dest: '/tmp' }))
  async handleZipUpload(@UploadedFile() file: any) {
    return this.zipService.unzip(file.path);
  }
}