import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, UserResponse, UserSecret } from "../users/entities/user.entity";
import { Payload } from "./entities/payload.entity";

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  _parseToken(authToken?: string): LoginDto | null {
    if (!authToken) return null;

    const [scheme, token] = authToken.split(' ');

    if (scheme !== 'Basic' || !token) return null;

    const [email, password] = Buffer.from(token, 'base64')
      .toString('utf8')
      .split(':');

    return { email, password };
  }

  _generateUserResponse(user: UserSecret): UserResponse {
    return new User(user.id, user.email, user.roles);
  }

  async login(body: LoginDto, authToken: string | undefined) {
    const access = this._parseToken(authToken) ?? {
      email: body.email!,
      password: body.password!,
    };

    if (!access?.email || !access?.password)
      throw new UnauthorizedException('Bad credentials');

    const user: UserSecret | null = await this.users.findByEmail(access.email);

    if (!user || user.password !== access.password)
      throw new UnauthorizedException('Bad credentials');

    return this.getAuthResponse(user);
  }

  async getAuthResponse(user: UserSecret): Promise<Payload> {
    const payload: UserResponse = { ...this._generateUserResponse(user) };

    console.log("PAYLOAD ", payload)

    const accessToken: string = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET ?? 'access-secret',
      expiresIn: '5m',
    });

    const refreshToken: string = await this.jwt.signAsync(
      { ...payload, type: 'refresh' },
      {
        secret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
        expiresIn: '1d',
      },
    );

    console.log("---------------")

    return { accessToken, refreshToken, user: payload };
  }

  async refresh(refreshToken: string) {
    try {
      const data = await this.jwt.verifyAsync<any>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'refresh-secret',
      });

      if (data?.type !== 'refresh') throw new UnauthorizedException();

      const user = await this.users.findByEmail(data.email);
      if (!user) throw new UnauthorizedException();

      const { accessToken } = await this.getAuthResponse(user);
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
