import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User, IAppUser } from 'src/common/models/user.model';
import { Observable, of } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  private allUsers: User[];

  constructor() {
    this.allUsers = [];
  }

  findOne(email: string): Observable<User> {
    const user: User = this.allUsers.find((u: User) => u.email === email);
    if (!user) {
      return of(null);
    }
    return of(plainToClass(User, user));
  }

  createUser(user: IAppUser): Observable<User> {
    // Check if user with the same username already exists
    return this.findOne(user.email).pipe(
      map((foundUser: User) => {
        if (foundUser) {
          throw new HttpException('This email is already registered.', HttpStatus.CONFLICT);
        }
        // If email is not in use, add new user to store
        const newUser = plainToClass(User, user);
        this.allUsers.push(newUser);
        return newUser;
      })
    )
  }
}
