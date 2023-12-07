import { Injectable } from '@nestjs/common';

import { IUsecase } from '@domain/common/interfaces';
import { User } from '@domain/user/entities';
import { IUserCreate } from '@domain/user/interfaces';
import { UserRepository } from '@domain/user/repositories';

@Injectable()
export class CreateUserUsecase implements IUsecase<IUserCreate, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: IUserCreate): Promise<User> {
    const user = new User(input);
    return this.userRepository.save(user);
  }
}
