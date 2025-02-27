import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindOneEmailGmailDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  transform?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  raw?: number;
}
