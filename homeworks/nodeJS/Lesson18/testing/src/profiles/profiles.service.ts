import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';

export type Profile = {
  id: string;
  email: string;
  displayName: string;
  age: number
};

@Injectable()
export class ProfilesService {
  private store: Profile[] = [];
  private count = 1;

  create(data: CreateProfileDto): Profile {
    if (this.store.some(p => p.email === data.email)) {
      throw new ConflictException('Email already exists');
    }

    const profile: Profile = {
      ...data,
      id: String(this.count++)
    };

    this.store.push(profile);

    return profile;
  }

  findById(id: string): Profile {
    const p = this.store.find(p => p.id === id);
    if (!p) throw new NotFoundException('Profile is not found');
    return p;
  }

  findAll(): Profile[] {
    return this.store;
  }
}