import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ description: 'User ID to leave feedback for' })
  @IsString()
  @IsNotEmpty()
  revieweeId: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;
}
