import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { User, ICredentials, IAppUser } from 'src/common/models/user.model';
import { Observable } from 'rxjs';
import { Routes } from 'src/common/constants/route.const';
import { map } from 'rxjs/operators';

@Controller(`${Routes.API_ROUTE}/user`)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  // TODO: Add validation
  @Post()
  createUser(@Body() user: ICredentials): Observable<IAppUser> {
    this.logger.debug(`Received creation request for ${user.email}.`);
    return this.userService.createUser(user).pipe(
      map((u: User) => u.toAppUser()),
    );
  }
}
