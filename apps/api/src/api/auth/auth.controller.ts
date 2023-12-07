import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserUsecase } from '@app/user';
import { CreateUserValidation } from './validations';

@Controller('auth')
export class AuthController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createUser(@Body() data: CreateUserValidation) {
    try {
      const user = await this.createUserUsecase.execute(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
