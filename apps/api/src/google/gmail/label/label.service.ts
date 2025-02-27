import { Injectable } from '@nestjs/common';
import { GoogleOAuthClientService } from 'src/google/google-oauth-client/google-oauth-client.service';
import { gmail_v1, google } from 'googleapis';
import { CreateLabelDto } from './dto/create-label.dto';
import { getConnection } from 'src/db/connection';

@Injectable()
export class LabelService {
  constructor(private googleOAuthClientService: GoogleOAuthClientService) {}

  async create(createDto: CreateLabelDto) {
    try {
      const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

      const res = await gmail.users.labels.create({
        userId: 'me',
        requestBody: {
          name: createDto.nome,
          labelListVisibility: 'labelHide', // https://developers.google.com/gmail/api/reference/rest/v1/users.labels?hl=pt-br#MessageListVisibility
          messageListVisibility: 'hide',
        },
      });

      //  data: {
      //     "name": "turbo-label",
      //     "labelListVisibility": "labelHide",
      //     "messageListVisibility": "hide"
      // }

      const label = await this.saveLabel(createDto, res.data);

      return label;
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      throw err;
    }
  }

  async saveLabel(
    createLabel: CreateLabelDto,
    gmailLabel: gmail_v1.Schema$Label,
  ) {
    const connection = getConnection();

    const [label] = await connection('gmail_labels')
      .insert({
        nome: createLabel.nome,
        label: gmailLabel,
      })
      .returning('*');

    return label;
  }

  async findAll() {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const res = await gmail.users.labels.list({
      userId: 'me',
    });

    return res.data;
  }
}
