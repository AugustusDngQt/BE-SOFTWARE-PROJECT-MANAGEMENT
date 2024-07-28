import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IUserLogin } from 'src/interfaces/user/user-login.interface';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: IUserLogin }): Promise<IUserLogin> {
    return this.authService.login(req.user);
  }
}
