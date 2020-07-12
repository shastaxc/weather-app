import { IAppUser } from './user.model';

export interface IAuthJwtPayload {
  user: IAppUser;
}
