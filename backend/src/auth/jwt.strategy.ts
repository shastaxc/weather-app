import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from 'src/common/constants/jwt.const';
import { IAuthJwtPayload } from 'src/common/models/jwt.model';
import { IAppUser } from 'src/common/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: IAuthJwtPayload): Promise<IAppUser> {
    const user: IAppUser = payload.user;
    return user;
  }
}