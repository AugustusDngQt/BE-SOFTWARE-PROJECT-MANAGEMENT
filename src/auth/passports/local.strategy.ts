import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { AuthMessages } from 'src/constants/messages/auth.message';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userNameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<IUserLogin> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(
        AuthMessages.EMAIL_OR_PHONE_NUMBER_IS_INCORRECT,
      );
    }
    return user;
  }
}
