import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GetUserUsecase } from '@app/user';
import { GetUserValidation } from './validations';

@Controller('users')
export class UserController {
  constructor(private readonly getUserUsecase: GetUserUsecase) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getUser(@Query() data: GetUserValidation) {
    try {
      const user = await this.getUserUsecase.execute(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
