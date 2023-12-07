import { User } from '../entities';
import { FindOneUserOption } from '../interfaces';

export abstract class UserRepository {
  abstract findMany(): User[] | Promise<User[]>;
  abstract findOne(opt?: FindOneUserOption): User | Promise<User>;
  abstract save(user: User): User | Promise<User>;
}
