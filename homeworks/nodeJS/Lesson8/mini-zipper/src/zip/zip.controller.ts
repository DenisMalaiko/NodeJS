import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZipService } from './zip.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('zip')
@Controller()
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Post('zip')
  @ApiOperation({ summary: 'Upload ZIP archive' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'ZIP archive',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { dest: '/tmp' }))
  async handleZipUpload(@UploadedFile() file: any) {
    return this.zipService.unzip(file.path);
  }
}