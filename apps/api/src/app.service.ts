import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
const { OAuth2 } = google.auth;

const YOUR_CLIENT_ID = '';
const YOUR_CLIENT_SECRET = '';

const oAuth2Client = new OAuth2(
  YOUR_CLIENT_ID, // Substitua pelo seu Client ID
  YOUR_CLIENT_SECRET, // Substitua pelo seu Client Secret
  'http://localhost:4333/redirect-login',
);

// Configure o redirect URI, que você configurou no console do Google Cloud

@Injectable()
export class AppService {
  authUrl() {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.send'],
      redirect_uri: 'http://localhost:4333/redirect-login',
    });

    return `<a href="${authUrl}" target="_blank"> LOGIN GOOGLE </a>`;
  }

  async redirectLogin(params: { code: string; scope: string }) {
    console.log({ params });

    try {
      const response = await oAuth2Client.getToken(params.code);

      console.log({ tokens: response.tokens });

      oAuth2Client.setCredentials(response.tokens);

      await this.sendEmail();
    } catch (err) {
      throw err;
    }
  }

  async sendEmail() {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const email = [
      'From: "Estevao " <estevaoblv@gmail.com>',
      'To: estevaovasques@hotmail.com, estevao.vasques@bmlog.com.br',
      'Subject: Teste de envio usando API do Gmail',
      '',
      'Este é um teste de envio de e-mail usando a API do Gmail.',
    ].join('\n');

    const base64EncodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: base64EncodedEmail,
      },
    });

    console.log(response);

    console.log('E-mail enviado com sucesso!');
  }
}
