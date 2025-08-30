import { Injectable } from '@nestjs/common';
import { UserSecret } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: UserSecret[] = [
    { id: 1, email: 'demo@example.com',  password: 'P@ssw0rd!', roles: ['user'] },
    { id: 2, email: 'admin@example.com', password: 'P@ssw0rd!', roles: ['admin'] },
  ];

  async findByEmail(email: string): Promise<UserSecret | null> {
    return this.users.find((user: UserSecret) => user.email === email) || null;
  }
}