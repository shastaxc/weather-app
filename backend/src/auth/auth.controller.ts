import { Controller, UseGuards, Post, Request, Logger } from '@nestjs/common';
import { User } from 'src/common/models/user.model';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Routes } from 'src/common/constants/route.const';

@Controller(`${Routes.API_ROUTE}/auth`)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(@Request() req: any): Promise<string> {
    const user: User = req.user;
    this.logger.debug(`Logging in user ${user.email}.`);
    const token = await this.authService.getJwt(user.toAppUser());
    this.logger.debug(`Sending token ${token}.`);
    return token;
  }
}
