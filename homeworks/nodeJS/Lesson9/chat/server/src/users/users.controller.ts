import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UserDTO } from "../dto";
import { UsersService } from "./users.service";

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  createUser(
    @Body('name') name: string,
    @UploadedFile() icon?: Express.Multer.File,
  ): UserDTO {
    const user: { name: string, icon: Express.Multer.File | undefined } = {
      name: name,
      icon: icon
    };

    return this.usersService.createUser(user);
  }

  @Get()
  list(): { items: UserDTO[]; total: number } {
    return this.usersService.getUsers();

  }

  @Get('icons/:iconPath')
  async icon(@Param('iconPath') iconPath: string, @Res() res: Response) {
    throw new ForbiddenException('Not implemented yet');
  }
}
