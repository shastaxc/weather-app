import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/common/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    this.logger.debug(`Received login request from ${email}.`);
    return await this.authService.validateUser(email, password).toPromise().then((user: User) => {
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    });
  }
}