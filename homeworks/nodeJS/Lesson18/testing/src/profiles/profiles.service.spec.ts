import { ConflictException, NotFoundException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(() => {
    service = new ProfilesService();
  });

  it('Create profile', () => {
    const dto: CreateProfileDto = {
      email: 'test@example.com',
      displayName: 'John',
      age: 25,
    };

    const profile = service.create(dto);

    expect(profile).toHaveProperty('id');
    expect(profile.email).toBe(dto.email);
    expect(profile.displayName).toBe(dto.displayName);
    expect(profile.age).toBe(dto.age);
  });

  it('Duplicate Profile', () => {
    const dto: CreateProfileDto = {
      email: 'duplicate@example.com',
      displayName: 'Jane',
      age: 30,
    };

    service.create(dto);

    expect(() => service.create(dto)).toThrow(ConflictException);
  });

  it('Find profile by ID', () => {
    const dto: CreateProfileDto = {
      email: 'unique@example.com',
      displayName: 'Alice',
      age: 20,
    };

    const created = service.create(dto);

    const found = service.findById(created.id);

    expect(found).toEqual(created);
  });

  it('Error on find profile by ID', () => {
    expect(() => service.findById('999')).toThrow(NotFoundException);
  });
});