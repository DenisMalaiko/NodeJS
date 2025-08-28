import { Injectable } from '@nestjs/common';
import { UserSecret } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: UserSecret[] = [
    { id: 1, email: 'user@gmail.com',  password: '1111', roles: ['user'] },
    { id: 2, email: 'admin@gmail.com', password: '2222', roles: ['admin'] },
  ];

  async findByEmail(email: string): Promise<UserSecret | null> {
    return this.users.find((user: UserSecret) => user.email === email) || null;
  }
}