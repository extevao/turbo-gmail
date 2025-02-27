import { Module } from '@nestjs/common';
import { CredenciaisGoogleService } from './credenciais-google.service';
import { CredenciaisGoogleController } from './credenciais-google.controller';

@Module({
  controllers: [CredenciaisGoogleController],
  providers: [CredenciaisGoogleService],
})
export class CredenciaisGoogleModule {}
