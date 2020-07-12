import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { map } from 'rxjs/operators';
import { User, IAppUser } from 'src/common/models/user.model';
import { Observable } from 'rxjs';
import { IAuthJwtPayload } from 'src/common/models/jwt.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UserService, private jwtService: JwtService) {}

  validateUser(email: string, pass: string): Observable<User> {
    return this.usersService.findOne(email).pipe(
      map((user: User) => {
        // Check if password matches the one in the user's record
        if (!user || user.password !== pass) {
          throw new UnauthorizedException;
        }
        // Strip password from the returned user data
        return user;
      })
    )
  }

  async getJwt(user: IAppUser): Promise<string> {
    const payload: IAuthJwtPayload = {
      user
    };
    return this.jwtService.sign(payload);
  }
}
