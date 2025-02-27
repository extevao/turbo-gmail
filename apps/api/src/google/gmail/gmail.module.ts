import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { ThreadModule } from './thread/thread.module';
import { WebhookGmailService } from './webhook-gmail.service';
import { LabelModule } from './label/label.module';

@Module({
  imports: [ThreadModule, LabelModule],
  controllers: [GmailController],
  providers: [GmailService, WebhookGmailService],
})
export class GmailModule {}
