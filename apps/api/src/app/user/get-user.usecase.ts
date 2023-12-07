import { Injectable } from '@nestjs/common';

import { IUsecase } from '@domain/common/interfaces';
import { User } from '@domain/user/entities';
import { FindOneUserOption } from '@domain/user/interfaces';
import { UserRepository } from '@domain/user/repositories';

@Injectable()
export class GetUserUsecase implements IUsecase<FindOneUserOption, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(options: FindOneUserOption): Promise<User> {
    return this.userRepository.findOne(options);
  }
}
