import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Routes } from './common/constants/route.constants';

@Controller(`${Routes.API_ROUTE}`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  testJwtGuard(): any {
    return 'SUCCESS';
  }
}
