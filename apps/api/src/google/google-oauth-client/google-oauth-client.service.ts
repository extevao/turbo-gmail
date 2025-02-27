import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { google } from 'googleapis';
import { getConnection } from 'src/db/connection';

@Injectable()
export class GoogleOAuthClientService {
  constructor(private configService: ConfigService) {}

  async getOAuthClient() {
    const oAuth2Client = this.createOAuthClient();

    const connection = getConnection();

    const googlecredentials = await connection
      .select('*')
      .from('credenciais_google')
      .orderBy('criado_em', 'desc')
      .first();

    if (!googlecredentials) throw new Error('Credencial nao encontrada');

    oAuth2Client.setCredentials(googlecredentials.tokens);

    const accessTokens = await oAuth2Client.refreshAccessToken();

    oAuth2Client.setCredentials(accessTokens.credentials);

    await connection('credenciais_google')
      .update({
        tokens: accessTokens.credentials as any,
        expiracao_token: new Date(
          accessTokens.credentials.expiry_date,
        ).toISOString(),
      })
      .where('id', googlecredentials.id);

    return oAuth2Client;
  }

  async getTokensOAuthClient(code: string) {
    const oauth2Client = this.createOAuthClient();

    const response = await oauth2Client.getToken(code);

    return response.tokens;
  }

  private createOAuthClient() {
    const CLIENT_ID = this.configService.get('GOOGLE_CLIENT_ID');
    const CLIENT_SECRET = this.configService.get('GOOGLE_CLIENT_SECRET');

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      'postmessage',
    );

    return oauth2Client;
  }
}
