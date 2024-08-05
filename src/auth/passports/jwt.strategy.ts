import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY_ACCESS_TOKEN'),
    });
  }
  async validate(payload: IUserLogin) {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }
}
