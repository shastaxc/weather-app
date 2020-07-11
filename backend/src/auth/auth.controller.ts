import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { User } from 'src/common/models/user.model';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Routes } from 'src/common/constants/route.constants';

@Controller(`${Routes.API_ROUTE}/auth`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(@Request() req: any): Promise<string> {
    const user: User = req.user;
    const token = await this.authService.getJwt(user.toAppUser());
    return token;
  }
}
