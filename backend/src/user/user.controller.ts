import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/models/user.model';
import { Observable } from 'rxjs';
import { Routes } from 'src/common/constants/route.constants';

@Controller(`${Routes.API_ROUTE}/user`)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: User): Observable<User> {
    return this.userService.createUser(user);
  }
}
