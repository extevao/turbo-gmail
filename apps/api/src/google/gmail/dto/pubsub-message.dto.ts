import { IsString, ValidateNested } from 'class-validator';
import { decodeEmail } from '../utils/decode-email';
import { Type } from 'class-transformer';

class MessageDto {
  @IsString()
  data: string;

  @IsString()
  messageId: string;

  @IsString()
  message_id: string;

  @IsString()
  publishTime: string;

  @IsString()
  publish_time: string;

  get decodedData() {
    const decodedString = decodeEmail(this.data);

    return JSON.parse(decodedString) as {
      emailAddress: string;
      historyId: number;
    };
  }
}

export class PubsubMessageDto {
  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;

  @IsString()
  subscription: string;
}

// {
//   message: {
//     data: 'eyJlbWFpbEFkZHJlc3MiOiJlc3RldmFvYmx2QGdtYWlsLmNvbSIsImhpc3RvcnlJZCI6NTA3MTg3fQ==',
//     messageId: '12527334830104501',
//     message_id: '12527334830104501',
//     publishTime: '2024-11-04T19:34:12.935Z',
//     publish_time: '2024-11-04T19:34:12.935Z'
//   },
//   subscription: 'projects/elevated-web-433914-c3/subscriptions/MyTopicSub'
// }
