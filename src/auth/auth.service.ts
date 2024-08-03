import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(userName: string, password: string): Promise<IUserLogin> {
    const user = await this.usersService.findOneByUniqueField(userName);
    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        id: user.id,
        phoneNumber: user.phoneNumber,
        email: user.email,
        name: user.name,
      };
    }
    return null;
  }

  async login(user: IUserLogin): Promise<IUserLogin> {
    return {
      ...user,
      accessToken: this.createAccessToken(user),
      refreshToken: this.createRefreshToken(user),
    };
  }

  createAccessToken(userLogin: IUserLogin): string {
    const payload = {
      sub: 'Access Token',
      iss: 'From Server',
      id: userLogin.id,
      phoneNumber: userLogin.phoneNumber,
      email: userLogin.email,
      name: userLogin.name,
      role: userLogin.role,
    };

    return this.jwtService.sign(payload);
  }

  createRefreshToken(userLogin: IUserLogin): string {
    const payload = {
      sub: 'Refresh Token',
      iss: 'From Server',
      id: userLogin.id,
      phoneNumber: userLogin.phoneNumber,
      email: userLogin.email,
      name: userLogin.name,
      role: userLogin.role,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
    });
  }

  createVerifyToken(userLogin: IUserLogin): string {
    const payload = {
      sub: 'Verify Token',
      iss: 'From Server',
      id: userLogin.id,
      phoneNumber: userLogin.phoneNumber,
      email: userLogin.email,
      name: userLogin.name,
      role: userLogin.role,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY_VERIFIED_TOKEN'),
      expiresIn: this.configService.get<string>('VERIFIED_TOKEN_EXPIRES'),
    });
  }

  createForgotPasswordToken(userLogin: IUserLogin): string {
    const payload = {
      sub: 'Forgot Password Token',
      iss: 'From Server',
      id: userLogin.id,
      phoneNumber: userLogin.phoneNumber,
      email: userLogin.email,
      name: userLogin.name,
      role: userLogin.role,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(
        'SECRET_KEY_FORGOT_PASSWORD_TOKEN',
      ),
      expiresIn: this.configService.get<string>(
        'FORGOT_PASSWORD_TOKEN_EXPIRES',
      ),
    });
  }
}
