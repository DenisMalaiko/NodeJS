export type UserInfo = {
  email: string;
  roles: string[];
}

export type UserSecret = UserInfo & {
  id: number;
  password: string;
}

export type UserResponse = UserInfo & {
  sub: number;
};

export class User implements UserResponse {
  constructor(public sub: number, public email: string, public roles: string[]) {
    this.sub = sub;
    this.email = email;
    this.roles = roles;
  }
}