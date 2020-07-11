export interface IUser {
  email: string,
  password: string,
}

export class User {
  email = undefined;
  password = undefined;

  constructor(init: Partial<IUser>) {
    Object.assign(this, init);
  }

  toAppUser(): IAppUser {
    return {
      email: this.email
    };
  }
}

export interface IAppUser {
  email: string,
}
