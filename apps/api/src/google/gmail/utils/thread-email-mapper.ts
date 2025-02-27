import { gmail_v1 } from 'googleapis';
import { EmailMapper, OptionsEmailMapper } from './email-mapper';

export class ThreadEmailMapper {
  static format(thread: gmail_v1.Schema$Thread, options: OptionsEmailMapper) {
    return {
      id: thread.id,
      historyId: thread.historyId,
      messages: thread.messages?.map((item) =>
        EmailMapper.format(item, options),
      ),
    };
  }
}
