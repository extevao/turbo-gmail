import { PubSub } from '@google-cloud/pubsub';

const projectId =
  '889384092928-c1p59ih83qofqb3e9l4v08jpor8lh4jc.apps.googleusercontent.com';
// const topicNameOrId = 'projects/elevated-web-433914-c3/topics/MyTopic';
const subscriptionName = 'projects/elevated-web-433914-c3/subscriptions/MySub';

import { Injectable } from '@nestjs/common';

import { GoogleOAuthClientService } from '../google-oauth-client/google-oauth-client.service';
import { logAgora } from 'src/core/utils/date.utils';

@Injectable()
export class WatchInboxService {
  constructor(private googleOAuthClientService: GoogleOAuthClientService) {}

  onModuleInit() {
    // this.watch().catch((err) => {
    //   console.error(err);
    // });
  }

  async watch() {
    try {
      const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

      const pubsub = new PubSub({ authClient: oAuth2Client, projectId });

      // Creates a new topic
      const subscription = pubsub.subscription(subscriptionName);

      // Receive callbacks for new messages on the subscription
      subscription.on('message', (message) => {
        // console.log('message', message);
        console.log(
          `------------- Received message:  ${logAgora()}  -------------`,
        );
        console.log('[id]', message.id);
        console.log('[received]', message.received);
        console.log('[data]', JSON.parse(message.data.toString()));

        // 17/09 { emailAddress: 'estevaoblv@gmail.com', historyId: 493775 }
        // console.log('[data]', message.data);
        // console.log('[toString]', message.data.toString());
        // console.log('[data]', JSON.parse(message.data.toString()));

        message.ack();
      });

      // Receive callbacks for errors on the subscription
      subscription.on('error', (error) => {
        console.error('Received error:', error);
        process.exit(1);
      });
    } catch (error) {
      console.log(error.message);
      console.error(error.response?.data);
    }
  }
}
