import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class WebHookMessageDto {
  @IsString()
  emailAddress: string;

  @IsNumber()
  historyId: number;

  @IsOptional()
  @IsBoolean()
  debug: boolean = false;
}
