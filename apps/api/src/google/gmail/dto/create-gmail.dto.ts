import { IsString } from 'class-validator';

export class CreateGmailDto {
  @IsString()
  subject: string;

  @IsString()
  to: string;

  @IsString()
  messageBody: any;
}
