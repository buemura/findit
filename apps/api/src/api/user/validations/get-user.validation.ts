import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GetUserValidation {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
