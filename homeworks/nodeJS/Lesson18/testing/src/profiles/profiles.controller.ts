import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProfilesService} from './profiles.service';
import {CreateProfileDto} from './dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.profilesService.findById(id);
  }
}