import { Controller, Get, Param } from '@nestjs/common';
import { ThreadService } from './thread.service';

@Controller('google/gmail/emails-thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get()
  findAll() {
    return this.threadService.findAll();
  }

  @Get(':id')
  findMessagesThread(@Param('id') id: string) {
    return this.threadService.listMessagesByThreadId(id, {} as any);
  }
}
