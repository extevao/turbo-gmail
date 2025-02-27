import { Injectable } from '@nestjs/common';

import { gmail_v1, google } from 'googleapis';
import { GoogleOAuthClientService } from '../google-oauth-client/google-oauth-client.service';
import { GmailService } from './gmail.service';
import { getConnection } from 'src/db/connection';
import { PubsubMessageDto } from './dto/pubsub-message.dto';

@Injectable()
export class WebhookGmailService {
  constructor(
    private googleOAuthClientService: GoogleOAuthClientService,
    private gmailService: GmailService,
  ) {}

  async receivedMessage(pubsubMessage: PubsubMessageDto) {
    try {
      console.log('[message]', pubsubMessage);
      console.log(pubsubMessage.message.decodedData);

      const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

      const messageData = pubsubMessage.message.decodedData;

      const res = await gmail.users.history.list({
        userId: 'me',
        startHistoryId: String(messageData.historyId),
      });

      await this.createLog(pubsubMessage);
      // const messages = await this.getMessagesHistory(res.data);

      // return { historyData: res.data, messages };
      return { historyData: res.data, messages: [] };
    } catch (err) {
      if (err.response) {
        return err.response.data;
      }
      throw err;
    }
  }

  async getMessagesHistory(historyData: gmail_v1.Schema$ListHistoryResponse) {
    const gmailMessages = [];

    if (!historyData.history) return;

    const historyMessages = historyData.history.flatMap(
      (history) => history.messages,
    );

    for (const historyMessage of historyMessages) {
      if (!historyMessage.id) return;

      const message = await this.gmailService.findOne(historyMessage.id, {
        transform: 1,
      });

      gmailMessages.push(message);
    }

    return gmailMessages;
  }

  async createLog(
    message: PubsubMessageDto,
    historyData?: gmail_v1.Schema$ListHistoryResponse,
  ) {
    const connection = getConnection();

    await connection('gmail_received_logs').insert({
      body: message,
      history: historyData,
    });
  }
}
