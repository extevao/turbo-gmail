import * as path from 'node:path';
import * as fs from 'node:fs';

import { Injectable } from '@nestjs/common';
import { CreateGmailDto } from './dto/create-gmail.dto';

import { gmail_v1, google } from 'googleapis';
import { GoogleOAuthClientService } from '../google-oauth-client/google-oauth-client.service';
import { EmailMapper } from './utils/email-mapper';
import { getConnection } from 'src/db/connection';
import { WatchInboxGmailDto } from './dto/watch-inbox.gmail.dto';
import { FindOneEmailGmailDto } from './dto/find-one-email-gmail.dto';
import { ThreadEmailMapper } from './utils/thread-email-mapper';

@Injectable()
export class GmailService {
  constructor(private googleOAuthClientService: GoogleOAuthClientService) {}

  async create(createGmailDto: CreateGmailDto) {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const subject = createGmailDto.subject;

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      'base64',
    )}?=`;

    const hblData = fs
      .readFileSync(
        path.join(__dirname, '../../../arquivos', 'HBL ORIGINAL.pdf'),
      )
      .toString('base64');

    const documentoPdfData = fs
      .readFileSync(path.join(__dirname, '../../../arquivos', 'documento.pdf'))
      .toString('base64');

    const fotoData = fs
      .readFileSync(
        path.join(__dirname, '../../../arquivos', '20250424095201.jpg'),
      )
      .toString('base64');

    const boundary = '__MY_BOUNDARY__';

    const messageParts = [
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      'MIME-Version: 1.0',
      `To: ${createGmailDto.to}`,
      'From: Estevao <estevaoblv@gmail.com>',
      `Subject: ${utf8Subject}`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: 7bit',
      '',
      createGmailDto.messageBody,
      '',
      `--${boundary}`,
      'Content-Type: application/pdf',
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: base64',
      'Content-Disposition: attachment; filename="HBL Original.pdf"',
      '',
      hblData,
      '',

      `--${boundary}`,
      'Content-Type: application/pdf',
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: base64',
      'Content-Disposition: attachment; filename="documento.pdf"',
      '',
      documentoPdfData,
      '',

      `--${boundary}`,
      'Content-Type: image/jpeg',
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: base64',
      'Content-Disposition: attachment; filename="foto.jpg"',
      '',
      fotoData,
      '',

      `--${boundary}--`,
    ];

    const message = messageParts.join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        // threadId: '1921feaa8be2edac',
      },
      uploadType: 'multipart',
    });

    console.log(res.data);

    // const modifyRes = await gmail.users.messages.modify({
    //   userId: 'me',
    //   id: res.data.id,
    //   requestBody: {
    //     addLabelIds: ['Label_6'],
    //   },
    // });

    await this.createEmail({
      createGmailDto,
      requestData: {
        messageParts,
      },
      responseData: res.data,
    });

    return { resData: res.data };
  }

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

  async findOne(id: string, queryParams: FindOneEmailGmailDto) {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
      const response = await gmail.users.messages.get({
        userId: 'me',
        id,
        format: queryParams.raw ? 'raw' : 'full',
      });

      return EmailMapper.format(response.data, {
        transform: !!queryParams.transform,
        raw: !!queryParams.raw,
      });
      // return response.data;
    } catch (err) {
      console.error('Error fetching emails:', err);

      throw err;
    }
  }

  async findMessagesThread(id: string, queryParams: FindOneEmailGmailDto) {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
      const response = await gmail.users.threads.get({
        userId: 'me',
        id,
      });

      return ThreadEmailMapper.format(response.data, {
        transform: !!queryParams.transform,
        raw: !!queryParams.raw,
      });
    } catch (err) {
      console.error('Error fetching emails:', err);

      throw err;
    }
  }

  async findEmailsFromHistory(historyId: string) {
    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const res = await gmail.users.history.list({
      userId: 'me', // 'me' refere-se ao usuário autenticado
      startHistoryId: historyId,
    });

    return res.data;
  }

  remove(id: number) {
    return `This action removes a #${id} gmail`;
  }

  async createEmail({
    createGmailDto,
    requestData,
    responseData,
  }: {
    createGmailDto: CreateGmailDto;
    requestData: any;
    responseData: gmail_v1.Schema$Message;
  }) {
    const connection = getConnection();

    const [email] = await connection('emails')
      .insert({
        assunto: createGmailDto.subject,
        para: createGmailDto.to,
        mensagem: createGmailDto.messageBody,
        gmail_message_id: responseData.id,
        gmail_thread_id: responseData.threadId,
        tipo_mensagem: 'acompanhamento',
      })
      .returning('*');

    await connection('gmail_sends_logs').insert({
      id_email: email.id,
      request_data: requestData,
      response_data: responseData,
    });
  }

  async watchInboxEmail(watchDto: WatchInboxGmailDto) {
    console.log('[watchInboxEmail]', watchDto);

    const oAuth2Client = await this.googleOAuthClientService.getOAuthClient();

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    if (watchDto.watch) {
      const response = await gmail.users.watch({
        userId: 'me',
        requestBody: {
          labelIds: ['INBOX'],
          topicName: 'projects/elevated-web-433914-c3/topics/MyTopic',
        },
      });

      return response.data;
    }

    const response = await gmail.users.stop({
      userId: 'me',
    });

    return response;
  }
}
