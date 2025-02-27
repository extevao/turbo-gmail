import { IsBoolean, IsOptional } from 'class-validator';

export class WatchInboxGmailDto {
  @IsOptional()
  @IsBoolean()
  watch: boolean = false;
}
