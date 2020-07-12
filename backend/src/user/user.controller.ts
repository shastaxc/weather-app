import { Controller, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User, ICredentials, IAppUser } from 'src/common/models/user.model';
import { Observable } from 'rxjs';
import { Routes } from 'src/common/constants/route.const';
import { map } from 'rxjs/operators';
import { valueExists } from 'src/common/util/helper-fns';

@Controller(`${Routes.API_ROUTE}/user`)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: ICredentials): Observable<IAppUser> {
    this.logger.debug(`Received creation request for ${user.email}.`);

    // Validation
    // Ensure values exist
    if (!valueExists(user.email) || !valueExists(user.password) || user.email.length === 0 || user.password.length === 0) {
      throw new HttpException('Submitted credentials are missing or incomplete.', HttpStatus.BAD_REQUEST);
    }

    // Create user
    return this.userService.createUser(user).pipe(
      map((u: User) => u.toAppUser()),
    );
  }
}
