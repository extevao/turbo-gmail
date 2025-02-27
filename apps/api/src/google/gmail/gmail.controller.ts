import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GmailService } from './gmail.service';
import { CreateGmailDto } from './dto/create-gmail.dto';
import { WatchInboxGmailDto } from './dto/watch-inbox.gmail.dto';
import { FindOneEmailGmailDto } from './dto/find-one-email-gmail.dto';
import { WebhookGmailService } from './webhook-gmail.service';
import { PubsubMessageDto } from './dto/pubsub-message.dto';

@Controller('google/gmail')
export class GmailController {
  constructor(
    private gmailService: GmailService,
    private webhookGmailService: WebhookGmailService,
  ) {}

  @Post()
  create(@Body() createGmailDto: CreateGmailDto) {
    return this.gmailService.create(createGmailDto);
  }

  @Get()
  findAll() {
    return this.gmailService.findAll();
  }

  @Get('thread/:id')
  findMessagesThread(
    @Param('id') id: string,
    @Query() queryParams: FindOneEmailGmailDto,
  ) {
    console.log('[findMessagesThread]', { id, queryParams });

    return this.gmailService.findMessagesThread(id, queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() queryParams: FindOneEmailGmailDto) {
    console.log('[findOne]', { id, queryParams });

    return this.gmailService.findOne(id, queryParams);
  }

  @Get('history/:historyId')
  findEmailsFromHistory(@Param('historyId') historyId: string) {
    return this.gmailService.findEmailsFromHistory(historyId);
  }

  // https://4839-177-9-60-243.ngrok-free.app
  // /google/gmail/webhook
  @HttpCode(HttpStatus.OK)
  @Post('webhook')
  receivedMessage(@Body() message: PubsubMessageDto) {
    return this.webhookGmailService.receivedMessage(message);
  }

  @Post('watch-inbox-email')
  watchInboxEmail(@Body() watchDto: WatchInboxGmailDto) {
    return this.gmailService.watchInboxEmail(watchDto);
  }
}
