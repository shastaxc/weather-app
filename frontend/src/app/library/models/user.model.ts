export interface IAppUser {
  email: string;
}

export class AppUser implements IAppUser {
  email = undefined;

  constructor(init: Partial<IAppUser>) {
    Object.assign(this, init);
  }
}

export interface ICredentials {
  email: string;
  password: string;
}
