import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import { GoogleOAuthClientService } from 'src/google/google-oauth-client/google-oauth-client.service';
import { FindOneEmailGmailDto } from '../dto/find-one-email-gmail.dto';

@Injectable()
export class ThreadService {
  constructor(private googleOAuthClientService: GoogleOAuthClientService) {}

  async findAll() {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
      const res = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 10,
      });
      console.log('Emails:', res.data.messages);

      return res.data;
    } catch (err) {
      console.error('Error fetching emails:', err);

      throw err;
    }
  }

  async listMessagesByThreadId(
    threadId: string,
    queryParams: FindOneEmailGmailDto,
  ) {
    console.log('[listMessagesByThreadId]', { threadId, queryParams });

    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
      const response = await gmail.users.messages.list({
        userId: 'me',
        // q: `to: estevao.vasques@bmlog.com.br`,
      });

      return response;

      // return ThreadEmailMapper.format(response.data, {
      //   transform: !!queryParams.transform,
      //   raw: !!queryParams.raw,
      // });
    } catch (err) {
      console.error('Error fetching emails:', err);

      throw err;
    }
  }
}
